import React from 'react';
import { Alert } from 'react-native';
import Expo, { AR, Asset } from 'expo';
import { Permissions } from 'expo-permissions';
// Let's alias ExpoTHREE.AR as ThreeAR so it doesn't collide with Expo.AR.
import ExpoTHREE, { AR as ThreeAR, THREE } from 'expo-three';
// Let's also import `expo-graphics`
// expo-graphics manages the setup/teardown of the gl context/ar session, creates a frame-loop, and observes size/orientation changes.
// it also provides debug information with `isArCameraStateEnabled`
import { View as GraphicsView } from 'expo-graphics';
import { Actions } from 'react-native-router-flux';

export default class App extends React.Component {
  async componentDidMount() {
    // Turn off extra warnings
    THREE.suppressExpoWarnings(true);
    //ask for camera permissions before rendering
    const { status, permissions } = await Permissions.askAsync(
      Permissions.CAMERA
    );
    if (status === 'denied') {
      Alert.alert(
        'Oh, bummer...',
        "Can't do anything without permission. Allow Hotspot to use your Camera to proceed.",
        [
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => Actions.pop({ type: 'replace' })
          }
        ],
        { cancelable: true }
      );
    }
  }

  // When our context is built we can start coding 3D things.
  onContextCreate = props => {
    console.log('===============');
    console.log('[OnContextCreate] is working:', props);
    console.log('===============');
    // This will allow ARKit to collect Horizontal surfaces
    AR.setPlaneDetection(AR.PlaneDetection.Horizontal);
    this.commonSetup(props);
  };

  commonSetup = ({ gl, scale: pixelRatio, width, height }) => {
    // Create a 3D renderer
    this.renderer = new ExpoTHREE.Renderer({
      gl,
      pixelRatio,
      width,
      height
    });
    console.log('===============');
    console.log('[Creating renderer...]:');
    console.log('===============');

    /*********************************************** */
    // this.renderer = ExpoTHREE.createRenderer({ gl });
    // this.renderer.setPixelRatio(scale);
    // this.renderer.setSize(width, height);
    /*********************************************** */

    // We will add all of our meshes to this scene.
    this.scene = new THREE.Scene();
    console.log('===============');
    console.log('[Creating scene...]:');
    console.log('===============');
    // This will create a camera texture and use it as the background for our scene
    this.scene.background = new ThreeAR.BackgroundTexture(this.renderer);
    console.log('===============');
    console.log('[Creating bg texture...]:');
    console.log('===============');

    /*********************************************** */
    // this.scene.background = ExpoTHREE.createARBackgroundTexture(
    //   arSession,
    //   this.renderer
    // );
    /************************************************ */

    // Now we make a camera that matches the device orientation.
    // Ex: When we look down this camera will rotate to look down too!
    this.camera = new ThreeAR.Camera(width, height, 0.01, 1000);
    console.log('===============');
    console.log('[Creating camera...]:');
    console.log('===============');
    /************************************************ */
    // this.camera = ExpoTHREE.createARCamera(
    //   arSession,
    //   width / scale,
    //   height / scale,
    //   0.01,
    //   1000
    // );
    /************************************************ */

    // Make a cube - notice that each unit is 1 meter in real life, we will make our box 0.1 meters
    const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    // const geometry = new three.BoxGeometry(0.1, 0.1, 0.1);
    // Simple color material
    const material = new THREE.MeshPhongMaterial({
      color: 0xff00ff
    });
    // const material = new three.MeshPhongMaterial({ color: 0xff00ff });

    // Combine our geometry and material
    this.cube = new THREE.Mesh(geometry, material);
    // this.cube = new three.Mesh(geometry, material);
    // Place the box 0.4 meters in front of us.
    this.cube.position.z = -0.4;
    // Add the cube to the scene
    this.scene.add(this.cube);

    // Setup a light so we can see the cube color
    // AmbientLight colors all things in the scene equally.
    this.scene.add(new THREE.AmbientLight(0xff00ff));
    // Create this cool utility function that let's us see all the raw data points.
    this.points = new ThreeAR.Points();
    // this.points = new three.Points();
    // Add the points to our scene...
    this.scene.add(this.points);
  };

  // When the phone rotates, or the view changes size, this method will be called.
  onResize = ({ x, y, scale, width, height }) => {
    console.log('===============');
    console.log('[OnReiseze working...]:');
    console.log('===============');
    // Let's stop the function if we haven't setup our scene yet
    if (!this.renderer) {
      return;
    }
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setPixelRatio(scale);
    this.renderer.setSize(width, height);
  };

  // Called every frame.
  onRender = () => {
    console.log('===============');
    console.log('[On Render working...]:');
    console.log('===============');
    // This will make the points get more rawDataPoints from Expo.AR
    this.points.update();
    // Finally render the scene with the AR Camera
    this.renderer.render(this.scene, this.camera);
  };

  render() {
    console.log('===============');
    console.log('[AR]:', 'rendering...');
    console.log('===============');
    // You need to add the `isArEnabled` & `arTrackingConfiguration` props.
    // `isArRunningStateEnabled` Will show us the play/pause button in the corner.
    // `isArCameraStateEnabled` Will render the camera tracking information on the screen.
    // `arTrackingConfiguration` denotes which camera the AR Session will use.
    // World for rear, Face for front (iPhone X only)
    return (
      <GraphicsView
        style={{ flex: 1 }}
        onContextCreate={this.onContextCreate}
        onRender={this.onRender}
        onResize={this.onResize}
        isArEnabled
        isArRunningStateEnabled
        isArCameraStateEnabled
      />
    );
  }
}
