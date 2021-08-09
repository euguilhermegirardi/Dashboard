const useStorage = () => {
  const prefix = '@Dashboard_Exercise'

  const setStorage = (key, value) => {
    window.localStorage.setItem(`${prefix}:${key}`, value)
  }

  const getStorage = (key) => {
    return window.localStorage.getItem(`${prefix}:${key}`)
  }

  const removeKeyStorage = (key) => {
    window.localStorage.removeItem(`${prefix}:${key}`)
  }

  return {
    setStorage,
    getStorage,
    removeKeyStorage,
  }
}

export {useStorage}