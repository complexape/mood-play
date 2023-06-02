import * as faceapi from 'face-api.js'

const loadModels = async () => {
    await faceapi.loadSsdMobilenetv1Model('/models');
    await faceapi.loadFaceLandmarkModel('/models');
}

loadModels();

export { faceapi };