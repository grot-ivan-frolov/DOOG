/* eslint-disable max-len */
class DogFoodApi {
  constructor({ baseUrl }) {
    this.baseUrl = baseUrl
  }

  getAuthorizationToken() {
    return `Bearer ${this.token}`
  }

  async signUp(data) {
    const response = await fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (response.status >= 400) {
      throw new Error(`${response.status}: Произошла ошибка при регистрации. ${response.statusText}.`)
    }
    return response.json()
  }

  async signIn(data) {
    const response = await fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (response.status >= 400) {
      throw new Error(`${response.status}: Произошла ошибка при авторизации. ${response.statusText}.`)
    }
    return response.json()
  }

  getProductsByIds(ids, token) {
    return Promise.all(ids.map((id) => fetch(`${this.baseUrl}/products/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json())))
  }

  async getAllProducts(search, token) {
    const response = await fetch(`${this.baseUrl}/products/search?query=${search}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })

    if (response.status >= 400) {
      throw new Error(`${response.status}: Произошла ошибка при получении информации о товарах. ${response.statusText}.`)
    }

    return response.json()
  }

  async getProduct(id, token) {
    const response = await fetch(`${this.baseUrl}/products/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })

    if (response.status >= 400) {
      throw new Error(`${response.status}: Произошла ошибка при получении информации о товарe. ${response.statusText}.`)
    }

    return response.json()
  }

  async addProduct(data, token) {
    const response = await fetch(`${this.baseUrl}/products`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (response.status >= 400) {
      throw new Error(`${response.status}: Произошла ошибка при сохранении информации о товаре. ${response.statusText}.`)
    }
    return response.json()
  }

  async editProduct(productId, data, token) {
    const response = await fetch(`${this.baseUrl}/products/${productId}`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (response.status >= 400) {
      throw new Error(`${response.status}: Произошла ошибка при сохранении информации о товаре. ${response.statusText}.`)
    }
    return response.json()
  }

  async deleteProduct(productId, token) {
    const response = await fetch(`${this.baseUrl}/products/${productId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    if (response.status >= 400) {
      throw new Error(`${response.status}: Произошла ошибка при удалении товара. ${response.statusText}.`)
    }
    return response.json()
  }

  async getUser(group, token) {
    const response = await fetch(`${this.baseUrl}/v2/${group}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })

    if (response.status >= 400) {
      throw new Error(`${response.status}: Произошла ошибка при получении информации о пользователе. ${response.statusText}.`)
    }

    return response.json()
  }

  async editUserInfo(group, data, token) {
    const response = await fetch(`${this.baseUrl}/v2/${group}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (response.status >= 400) {
      throw new Error(`${response.status}: Произошла ошибка при сохранении информации о пользователе. ${response.statusText}.`)
    }
    return response.json()
  }

  async editUserAvatar(group, data, token) {
    const response = await fetch(`${this.baseUrl}/v2/${group}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (response.status >= 400) {
      throw new Error(`${response.status}: Произошла ошибка при сохранении аватара. ${response.statusText}.`)
    }
    return response.json()
  }

  async getComments(productId, token) {
    const response = await fetch(`${this.baseUrl}/products/review/${productId}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })

    if (response.status >= 400) {
      throw new Error(`${response.status}: Произошла ошибка при получении отзывов. ${response.statusText}.`)
    }

    return response.json()
  }

  async addComment(productId, data, token) {
    const response = await fetch(`${this.baseUrl}/products/review/${productId}`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (response.status >= 400) {
      throw new Error(`${response.status}: Произошла ошибка при сохранении отзыва. ${response.statusText}.`)
    }
    return response.json()
  }

  async deleteComment(productId, reviewId, token) {
    const response = await fetch(`${this.baseUrl}/products/review/${productId}/${reviewId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    if (response.status >= 400) {
      throw new Error(`${response.status}: Произошла ошибка при удалении отзыва. ${response.statusText}.`)
    }
    return response.json()
  }
}
export const DogFoodApiConst = new DogFoodApi({ baseUrl: 'https://api.react-learning.ru' })
