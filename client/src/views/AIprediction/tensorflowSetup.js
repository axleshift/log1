import * as tf from '@tensorflow/tfjs-core'
import '@tensorflow/tfjs-backend-cpu'

export async function initializeTensorFlow() {
  try {
    await tf.setBackend('cpu')
    await tf.ready()
    console.log('TensorFlow initialized with backend:', tf.getBackend())
    return true
  } catch (error) {
    console.error('Failed to initialize TensorFlow:', error)
    return false
  }
}
