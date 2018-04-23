// import * as React from 'react';
// import './face-detect.css';
// import "tracking/build/tracking-min";
// import "tracking/build/data/face-min";

// interface TrackEvent {
//     data: Detection[];
// }

// interface Detection {
//     total: number;
//     height: number;
//     width: number;
//     x: number;
//     y: number;
// }

// interface State {
//     cameraStream?: string;
//     detections: Detection[];
// }

// export default class FaceDetect extends React.Component<any, State> {

//     canvas: HTMLCanvasElement | null;
//     canvasContext: CanvasRenderingContext2D | null;

//     constructor(props: any) {
//         super(props);
//         this.state = {
//             detections: []
//         }
//     }

//     async componentDidMount() {
//         var stream = await navigator.mediaDevices.getUserMedia({video: true});
//         this.setState({ cameraStream: URL.createObjectURL(stream) });

//         var x: any = tracking;
//         var tracker = new x.ObjectTracker('face');
//         tracker.setInitialScale(4);
//         tracker.setStepSize(2);
//         tracker.setEdgesDensity(0.1);
//         (tracking as any).track('#video', tracker, { camera: true });
//         tracker.on('track', this.onTrack);
//     }

//     onTrack = (event: TrackEvent) => {    
//         if (!this.canvas)
//             return;
        
//         if (this.canvasContext == null) {
//             var context = this.canvas.getContext("2d");
//             if (!context)
//                 return;

//             this.canvasContext = context;
//         }

//         this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
//         event.data.forEach(rect => {

//             if (this.canvasContext == null)
//                 return;

//             this.canvasContext.strokeStyle = '#a64ceb';
//             this.canvasContext.strokeRect(rect.x, rect.y, rect.width, rect.height);
//             this.canvasContext.font = '11px Helvetica';
//             this.canvasContext.fillStyle = "#fff";
//             this.canvasContext.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
//             this.canvasContext.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
//         });
//     }

//     render() {
//         const {cameraStream} = this.state;
//         return <div className="face-detect">
            
//             <video 
//                 id="video" 
//                 src={cameraStream}
//                 width="640" 
//                 height="480" 
//                 autoPlay 
//                 loop 
//                 muted 
//             />
//             <canvas 
//                 ref={c => this.canvas = c}
//                 width="640" 
//                 height="480" 
//             />
//         </div>
//     }
// }