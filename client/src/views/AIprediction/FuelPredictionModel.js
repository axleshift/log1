import * as tf from '@tensorflow/tfjs'

export class FuelPredictionModel {
  constructor() {
    this.model = null
    this.initializeBackend()
  }
  async initializeBackend() {
    try {
      // Try to use CPU backend
      await tf.setBackend('cpu')
      console.log('Using CPU backend:', tf.getBackend())
    } catch (error) {
      console.error('Error initializing TensorFlow backend:', error)
    }
  }
  // Create the model architecture
  createModel() {
    this.model = tf.sequential()

    // Add layers
    this.model.add(
      tf.layers.dense({
        units: 64,
        activation: 'relu',
        inputShape: [5], // [fuelQuantity, totalCost, litersPer100km, distance, previousConsumption]
      }),
    )

    this.model.add(
      tf.layers.dense({
        units: 32,
        activation: 'relu',
      }),
    )

    this.model.add(
      tf.layers.dense({
        units: 1, // Predict next fuel consumption
      }),
    )

    // Compile the model
    this.model.compile({
      optimizer: tf.train.adam(0.001),
      loss: 'meanSquaredError',
      metrics: ['mse'],
    })

    return this.model
  }

  // Prepare data for training
  preprocessData(fuelLogs) {
    const features = []
    const labels = []

    // Sort logs by date
    const sortedLogs = fuelLogs.sort((a, b) => new Date(a.date) - new Date(b.date))

    // We need to stop at length-1 since we're using the next value as label
    for (let i = 0; i < sortedLogs.length - 1; i++) {
      const currentLog = sortedLogs[i]

      // Create feature array for current log
      features.push([
        currentLog.fuelQuantity || 0,
        currentLog.totalCost || 0,
        currentLog.litersPer100km || 0,
        currentLog.distance || 0,
        i > 0 ? sortedLogs[i - 1].fuelQuantity || 0 : 0, // previous fuel quantity
      ])

      // Use next log's fuel quantity as label
      labels.push([sortedLogs[i + 1].fuelQuantity || 0])
    }

    // Verify we have equal numbers of features and labels
    console.log('Features length:', features.length)
    console.log('Labels length:', labels.length)

    if (features.length !== labels.length) {
      throw new Error(`Mismatch in data: ${features.length} features vs ${labels.length} labels`)
    }

    // Convert to tensors
    return {
      features: tf.tensor2d(features),
      labels: tf.tensor2d(labels),
    }
  }

  // Train the model
  async trainModel(features, labels) {
    try {
      if (!features || !labels) {
        throw new Error('Features or labels are missing')
      }

      console.log('Training data shapes:', {
        features: features.shape,
        labels: labels.shape,
      })

      const result = await this.model.fit(features, labels, {
        epochs: 50,
        validationSplit: 0.2,
        callbacks: {
          onEpochEnd: (epoch, logs) => {
            console.log(`Epoch ${epoch + 1}: loss = ${logs.loss.toFixed(4)}`)
          },
        },
      })

      // Clean up tensors
      features.dispose()
      labels.dispose()

      return result
    } catch (error) {
      console.error('Training error:', error)
      throw error
    }
  }

  // Make predictions
  async predict(inputData) {
    try {
      // Convert input data to tensor
      const inputTensor = tf.tensor2d([inputData])

      // Get prediction
      const prediction = await this.model.predict(inputTensor)

      // Convert prediction to array
      const predictionArray = await prediction.array()

      // Clean up tensors
      inputTensor.dispose()
      prediction.dispose()

      // Return the first row of predictions
      return predictionArray[0]
    } catch (error) {
      console.error('Prediction error:', error)
      return [0, 0, 0] // Return default values in case of error
    }
  }
}
