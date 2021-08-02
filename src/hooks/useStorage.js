const useStorage = () => {
  const prefix = '@Dashboard_Exercise'
  
  const setStorage = (key, value) => {
    localStorage.setItem(`${prefix}:${key}`, value)
  }
  
  const getStorage = (key) => {
    return localStorage.getItem(`${prefix}:${key}`)
  }

  const removeKeyStorage = (key) => {
    localStorage.removeItem(`${prefix}:${key}`)
  }

  return {
    setStorage,
    getStorage,
    removeKeyStorage
  }
}

export default useStorage