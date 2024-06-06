class APIHandler {
  constructor(baseUrl) {
    this.BASE_URL = baseUrl;
  }

  async getFullList() {
    const res = await fetch("http://localhost:8000/characters");
    const finalRes = await res.json();
    return finalRes;
  }

  async getOneRegister(id) {
    const res = await fetch(`http://localhost:8000/characters/${id}`);
    const finalRes = await res.json();
    return finalRes;
  }

  async createOneRegister(data) {
    const res = await fetch("http://localhost:8000/characters", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return res;
  }

  async updateOneRegister(data, id) {
    const res = await fetch("http://localhost:8000/characters/" + id, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return res;
  }

  async deleteOneRegister(id) {
    const res = await fetch(`http://localhost:8000/characters/${id}`, {
      method: "DELETE",
    });
    return res;
  }
}
