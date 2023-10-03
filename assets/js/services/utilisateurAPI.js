import axios from "axios";

function register(user){
    return axios.post(
        "http://127.0.0.1:8000/api/users",
        user
      );
}

function findAll(){
  return axios
  .get("/api/users")
  .then(response =>response.data['hydra:member'])
}

async function find(id) {
  const cachedUser = await Cache.get("users." + id);

  if (cachedUser) return cachedUser;

  return axios.get("api/users/" + id).then(response => {
    const user = response.data;

    Cache.set("users." + id, user);

    return user;
  });
}

export default {
  register,
  find,
  findAll,
};