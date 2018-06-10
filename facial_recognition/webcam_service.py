import face_recognition
import cv2
import sys
import json
import os
import click
import re
import time
import select

def image_files_in_folder(folder):
    return [os.path.join(folder, f) for f in os.listdir(folder) if re.match(r'.*\.(jpg|jpeg|png)', f, flags=re.I)]

# This method was borrowed from the facial_recognition CLI
def scan_known_people(known_people_folder):
    known_names = []
    known_face_encodings = []

    for file in image_files_in_folder(known_people_folder):

        basename = os.path.splitext(os.path.basename(file))[0]

        print(json.dumps({"event": "generating-encodings", "person": basename}))

        img = face_recognition.load_image_file(file)
        encodings = face_recognition.face_encodings(img, num_jitters=5) 

        if len(encodings) > 1:
            click.echo("WARNING: More than one face found in {}. Only considering the first face.".format(file))

        if len(encodings) == 0:
            click.echo("WARNING: No faces found in {}. Ignoring file.".format(file))
        else:
            known_names.append(basename)
            known_face_encodings.append(encodings[0])

    return known_names, known_face_encodings

def saveFrame(profileName, frame):
    fname = "./faces/{}.jpg".format(profileName)
    cv2.imwrite(fname, frame)

# This is a demo of running face recognition on live video from your webcam. It's a little more complicated than the
# other example, but it includes some basic performance tweaks to make things run a lot faster:
#   1. Process each video frame at 1/4 resolution (though still display it at full resolution)
#   2. Only detect faces in every other frame of video.

# PLEASE NOTE: This example requires OpenCV (the `cv2` library) to be installed only to read from your webcam.
# OpenCV is *not* required to use the face_recognition library. It's only required if you want to run this
# specific demo. If you have trouble installing it, try any of the other demos that don't require it instead.

# Get a reference to webcam #0 (the default one)
video_capture = cv2.VideoCapture(0)
# video_capture.set(cv2.CAP_PROP_BUFFERSIZE,1) # cant do this quite yet (https://github.com/opencv/opencv/pull/11047)

print(json.dumps({"event": "scanning-faces"}))

known_names, known_face_encodings = scan_known_people("./faces")

print(json.dumps({"event": "detecting"}))

# Initialize some variables
face_locations = []
face_encodings = []
face_names = []
process_this_frame = True
downscale_factor = 4.0
tolerance = 0.5
frame_count = 0
frame_processed = False

while True:

    total_start_time = time.time()
    frame_processed = False
    
    # 4 Empty grabs first due to framebuffer getting filled by slow render loop
    # video_capture.grab()
    # video_capture.grab()
    # video_capture.grab()
    # video_capture.grab()

    # Grab and decode a single frame of video
    ret, frame = video_capture.read()

    # Resize frame of video to 1/4 size for faster face recognition processing
    small_frame = cv2.resize(frame, (0, 0), fx=1/downscale_factor, fy=1/downscale_factor)

    # Only process every so many farmes for performance
    if frame_count == 10:

        frame_count = 0
        frame_processed = True

        # Find all the faces and face encodings in the current frame of video
        face_locations = face_recognition.face_locations(small_frame)
        face_encodings = face_recognition.face_encodings(small_frame, face_locations)

        face_names = []
        for face_encoding in face_encodings:

            # See if the face is a match for the known face(s)
            matches = face_recognition.compare_faces(known_face_encodings, face_encoding, tolerance)
            name = "Unknown"

            for i, match in enumerate(matches):
                if match:
                    face_names.append(known_names[i])

    frame_count += 1
    detections = []

    for (top, right, bottom, left), name in zip(face_locations, face_names):
        # Scale back up face locations since the frame we detected in was scaled to 1/4 size
        top *= downscale_factor
        right *= downscale_factor
        bottom *= downscale_factor
        left *= downscale_factor

        detections.append({"top": top, "left": left, "bottom": bottom, "right": right, "name": name})
        
    output = {"event": "detections-update", "detections": detections, "total_time": time.time() - total_start_time}

    if select.select([sys.stdin,],[],[],0.0)[0]:
        inp = sys.stdin.readline()
        obj = json.loads(inp)
        if obj["command"] == "saveFrame":
            saveFrame(obj["profileName"], frame)

    #inp = sys.stdin.newlines
    #print("GOT LINE {}".format(inp))

    if frame_processed:
        print(json.dumps(output))

    sys.stdout.flush()

# Release handle to the webcam
video_capture.release()
cv2.destroyAllWindows()