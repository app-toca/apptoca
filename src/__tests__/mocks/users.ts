import { IUserLoginRequest, IUserRequest } from "../../interfaces/users";

export const adminUser: IUserRequest = {
  name: "Ana",
  nickname: "Cisne",
  email: "anavitoriacisn314@gmail.com",
  age: 22,
  password: "senhaFortíssima123",
  year: 2,
  course: "ESPN",
  phrase: "Nenhum obstáculo é grande demais para quem desiste",
  url: "https://thumbs.dreamstime.com/b/love-coding-girl-women-hand-drawn-illustration-cute-monster-love-coding-girl-women-hand-drawn-illustration-cute-monster-144914862.jpg",
};

export const userAdminLogin: IUserLoginRequest = {
  email: "anavitoriacisn314@gmail.com",
  password: "senhaFortíssima123",
};

export const nonAdminUser: IUserRequest = {
  name: "João",
  nickname: "Porto",
  email: "joao.porto.ismart@gmail.com",
  age: 23,
  password: "senhaNãoTãoForte123",
  year: 3,
  course: "RBD",
  phrase: "Não deixe para fazer hoje aquilo que pode procrastinar amanhã",
  url: "https://thumbs.dreamstime.com/b/coding-fun-hand-drawn-vector-illustration-cute-programmer-cartoon-minimalism-style-cap-party-coding-fun-hand-drawn-157572614.jpg",
};

export const userNonAdminLogin: IUserLoginRequest = {
  email: "joao.porto.ismart@gmail.com",
  password: "senhaNãoTãoForte123",
};

export const userOwner: IUserRequest = {
  name: "Ana",
  nickname: "Cisne",
  email: "anavitoriacisn@gmail.com",
  age: 22,
  password: "senhaFortíssima12",
  year: 2,
  course: "ESPN",
  phrase: "Nenhum obstáculo é grande demais para quem desiste",
  url: "https://thumbs.dreamstime.com/b/love-coding-girl-women-hand-drawn-illustration-cute-monster-love-coding-girl-women-hand-drawn-illustration-cute-monster-144914862.jpg",
};

export const userOwnerLogin: IUserLoginRequest = {
  email: "anavitoriacisn@gmail.com",
  password: "senhaFortíssima12",
};

export const userDifferentEmail: IUserRequest = {
  name: "João",
  nickname: "Porto",
  email: "joao.ismart@gmail.com",
  age: 23,
  password: "senhaNãoTãoForte123",
  year: 3,
  course: "RBD",
  phrase: "Não deixe para fazer hoje aquilo que pode procrastinar amanhã",
  url: "https://thumbs.dreamstime.com/b/coding-fun-hand-drawn-vector-illustration-cute-programmer-cartoon-minimalism-style-cap-party-coding-fun-hand-drawn-157572614.jpg",
};

export const userDifferentEmailLogin: IUserLoginRequest = {
  email: "joao.ismart@gmail.com",
  password: "senhaNãoTãoForte123",
};

export const userOfUnknowOrg: IUserRequest = {
  name: "Joãozin",
  nickname: "Porto",
  email: "joao.porto.isNotSmart@mail.com",
  age: 23,
  password: "senhaNãoTãoForte13",
  year: 3,
  course: "RBD",
  phrase: "Não deixe para fazer hoje aquilo que pode procrastinar amanhã",
  url: "https://thumbs.dreamstime.com/b/coding-fun-hand-drawn-vector-illustration-cute-programmer-cartoon-minimalism-style-cap-party-coding-fun-hand-drawn-157572614.jpg",
};

export const userOfUnknowOrgLogin: IUserLoginRequest = {
  email: "joao.ismart@gmail.com",
  password: "senhaNãoTãoForte123",
};

export const userToBeDeteleted: IUserRequest = {
  name: "Joãozin",
  nickname: "Porto",
  email: "joao.isNotSmart@mail.com",
  age: 23,
  password: "senhaNãoTãoForte13",
  year: 3,
  course: "RBD",
  phrase: "Não deixe para fazer hoje aquilo que pode procrastinar amanhã",
  url: "https://thumbs.dreamstime.com/b/coding-fun-hand-drawn-vector-illustration-cute-programmer-cartoon-minimalism-style-cap-party-coding-fun-hand-drawn-157572614.jpg",
};
