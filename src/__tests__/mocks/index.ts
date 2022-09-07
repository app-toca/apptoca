import { IUserLoginRequest, IUserRequest } from "../../interfaces/users";


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

export const userDifferentEmail:IUserRequest = {
    name: 'João',
    surname: 'Porto',
    email: 'joao.ismart@gmail.com',
    age: 23,
    password: 'senhaNãoTãoForte123',
    year: 3,
    course: 'RBD',
    phrase: 'Não deixe para fazer hoje aquilo que pode procrastinar amanhã',
    isAdm: false,
    img: 'https://thumbs.dreamstime.com/b/coding-fun-hand-drawn-vector-illustration-cute-programmer-cartoon-minimalism-style-cap-party-coding-fun-hand-drawn-157572614.jpg'
}

export const userAdmin2:IUserRequest = {
    name: 'Lara',
    surname: 'Ponc',
    email: 'lara@mail.com',
    age: 24,
    password: 'senhaNãoTãoForte12',
    year: 3,
    course: 'RBD',
    phrase: 'Não deixe para fazer hoje aquilo que pode procrastinar amanhã',
    isAdm: true
}

export const userAdmin2Login:IUserLoginRequest = {
    email: 'lara@mail.com',
    password: 'senhaNãoTãoForte12'
}

export const userNonAdmin2: IUserRequest = {
    name: 'Pedro',
    surname: 'Xavier',
    email: 'lucas@gmail.com',
    age: 24,
    password: 'senhaNãoTãoForte12',
    year: 3,
    course: 'RBD',
    phrase: 'Não deixe para fazer hoje aquilo que pode procrastinar amanhã',
    isAdm: false
}

export const userNonAdmin2Login: IUserLoginRequest = {
    email: 'lucas@gmail.com',
    password: 'senhaNãoTãoForte12'
}

export const userToDelete:IUserRequest = {
    name: 'Joãozin',
    surname: 'Porto',
    email: 'joao.porto.isNotSmart@mail.com',
    age: 23,
    password: 'senhaNãoTãoForte13',
    year: 3,
    course: 'RBD',
    phrase: 'Não deixe para fazer hoje aquilo que pode procrastinar amanhã',
    isAdm: false,
    img: 'https://thumbs.dreamstime.com/b/coding-fun-hand-drawn-vector-illustration-cute-programmer-cartoon-minimalism-style-cap-party-coding-fun-hand-drawn-157572614.jpg'
}