import { IUserRequest } from "../../interfaces/users";


export const adminUser:IUserRequest = {
    name: 'Ana',
    surname: 'Cisne',
    email: 'anavitoriacisn314@gmail.com',
    age: 22,
    password: 'senhaFortíssima123',
    year: 2,
    course: 'ESPN',
    phrase: 'Nenhum obstáculo é grande demais para quem desiste',
    isAdm: true,
    img: 'https://thumbs.dreamstime.com/b/love-coding-girl-women-hand-drawn-illustration-cute-monster-love-coding-girl-women-hand-drawn-illustration-cute-monster-144914862.jpg'
}

export const nonAdminUser:IUserRequest = {
    name: 'João',
    surname: 'Porto',
    email: 'joao.porto.ismart@gmail.com',
    age: 23,
    password: 'senhaNãoTãoForte123',
    year: 3,
    course: 'RBD',
    phrase: 'Não deixe para fazer hoje aquilo que pode procrastinar amanhã',
    isAdm: false,
    img: 'https://thumbs.dreamstime.com/b/coding-fun-hand-drawn-vector-illustration-cute-programmer-cartoon-minimalism-style-cap-party-coding-fun-hand-drawn-157572614.jpg'
}

export const userSameEmail:IUserRequest = {
    name: 'Zézim',
    surname: 'Port',
    email: 'joao.porto.ismart@gmail.com',
    age: 24,
    password: 'senhaNãoTãoForte12',
    year: 3,
    course: 'RBD',
    phrase: 'Não deixe para fazer hoje aquilo que pode procrastinar amanhã',
    isAdm: false,
    img: 'https://thumbs.dreamstime.com/b/coding-fun-hand-drawn-vector-illustration-cute-programmer-cartoon-minimalism-style-cap-party-coding-fun-hand-drawn-157572614.jpg'
}

export const userToDelete:IUserRequest = {
    name: 'Joãozin',
    surname: 'Porto',
    email: 'joao.porto.ismart@mail.com',
    age: 23,
    password: 'senhaNãoTãoForte13',
    year: 3,
    course: 'RBD',
    phrase: 'Não deixe para fazer hoje aquilo que pode procrastinar amanhã',
    isAdm: false,
    img: 'https://thumbs.dreamstime.com/b/coding-fun-hand-drawn-vector-illustration-cute-programmer-cartoon-minimalism-style-cap-party-coding-fun-hand-drawn-157572614.jpg'
}