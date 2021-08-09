const useStorage = () => {
  const prefix = '@Dashboard_Exercise'

  const setStorage = (key, value) => {
    window.localStorage.setItem(`${prefix}:${key}`, value)
  }

  const getStorage = (key) => {
    return window.localStorage.getItem(`${prefix}:${key}`)
  }

  const removeKeyStorage = key => {
    window.localStorage.removeItem(`${prefix}:${key}`)
  }

  const setToLS = (key, value) => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  const getFromLS = key => {
    const value = window.localStorage.getItem(key);

    if (value) {
        return JSON.parse(value);
    }
  }

  return {
    setStorage,
    getStorage,
    removeKeyStorage,
    setToLS,
    getFromLS,
  }
}

export {useStorage}