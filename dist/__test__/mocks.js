"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialShelters = exports.initialDogspots = exports.initialPosts = exports.initialGroups = exports.initialUsers = void 0;
exports.initialUsers = [
    {
        _id: { $oid: '61a8f0bbf18a8432cf8c935d' },
        groups: [],
        groupRequests: [],
        posts: [],
        favorites: [],
        friends: [],
        friendRequests: [],
        friendRequestsSent: [],
        notifications: true,
        name: 'qqq',
        email: 'algo@algo.com',
        password: '$2b$10$FCT2hgXU7j5l0iDovcI8mOKUuv5jHq7R9HcmrG565ZJ3zNDT8DkC.',
        __v: { $numberInt: '0' },
    },
    {
        _id: { $oid: '61a8f0cff18a8432cf8c9360' },
        groups: ['61a8f436f18a8432cf8c9381'],
        groupRequests: [],
        posts: [],
        favorites: [],
        friends: [],
        friendRequests: [],
        friendRequestsSent: [],
        notifications: true,
        name: 'www',
        email: 'eso@eso.com',
        password: '$2b$10$gZ/gvYC4fXQT05SE4nyaw.YeHs.ex9SbQEi5PqiMwETrfZ.96TrHa',
        __v: { $numberInt: '1' },
    },
    {
        _id: { $oid: '61a8f0f7f18a8432cf8c9363' },
        groups: ['61a8f3ecf18a8432cf8c937c'],
        groupRequests: [],
        posts: [],
        favorites: [],
        friends: [],
        friendRequests: [],
        friendRequestsSent: [],
        notifications: true,
        name: 'eee',
        email: 'qwe@qwe.com',
        password: '$2b$10$MDMyhxrH/1H2zTwol1D58eB2mH8jBMgAdQ8wmcPUmGspsY1A5tDXu',
        __v: { $numberInt: '1' },
    },
];
exports.initialGroups = [
    {
        _id: { $oid: '61a8f3ecf18a8432cf8c937c' },
        members: ['61a8f0f7f18a8432cf8c9363'],
        createdAt: { $date: { $numberLong: '1638461558908' } },
        invitations: [],
        name: 'area1',
        creator: '61a8f0f7f18a8432cf8c9363',
        __v: { $numberInt: '0' },
    },
    {
        _id: { $oid: '61a8f436f18a8432cf8c9381' },
        members: ['61a8f0f7f18a8432cf8c9363', '61a8f0cff18a8432cf8c9360'],
        createdAt: { $date: { $numberLong: '1638461558908' } },
        invitations: [],
        name: 'perreando',
        creator: '61a8f0cff18a8432cf8c9360',
        __v: { $numberInt: '0' },
    },
];
exports.initialPosts = [
    {
        _id: { $oid: '61a8f4a9f18a8432cf8c9386' },
        tags: [],
        likes: [],
        comments: [],
        createdAt: { $date: { $numberLong: '1638461558907' } },
        creator: '61a8f0cff18a8432cf8c9360',
        __v: { $numberInt: '0' },
    },
    {
        _id: { $oid: '61a8f4bbf18a8432cf8c938a' },
        tags: [],
        likes: [],
        comments: [],
        createdAt: { $date: { $numberLong: '1638461558907' } },
        creator: '61a8f0bbf18a8432cf8c935d',
        __v: { $numberInt: '0' },
    },
    {
        _id: { $oid: '61a8f4d2f18a8432cf8c938e' },
        tags: [],
        likes: [],
        comments: [],
        createdAt: { $date: { $numberLong: '1638461558907' } },
        creator: '61a8f0bbf18a8432cf8c935d',
        __v: { $numberInt: '0' },
    },
];
exports.initialDogspots = [
    {
        _id: { $oid: '61a8f2f8f18a8432cf8c9370' },
        rating: [{ $numberInt: '0' }],
        name: 'parque1',
        kind: 'park',
        selectedFile: '688688688',
        mapDirections: 'madrid',
        __v: { $numberInt: '0' },
    },
    {
        _id: { $oid: '61a8f31cf18a8432cf8c9374' },
        rating: [{ $numberInt: '0' }],
        name: 'ruta1',
        kind: 'trail',
        selectedFile: '9999999',
        mapDirections: 'madrid',
        __v: { $numberInt: '0' },
    },
    {
        _id: { $oid: '61a8f33bf18a8432cf8c9378' },
        rating: [{ $numberInt: '0' }],
        name: 'area1',
        kind: 'greenArea',
        selectedFile: '9999888',
        mapDirections: 'barcelona',
        __v: { $numberInt: '0' },
    },
];
exports.initialShelters = [
    {
        _id: { $oid: '61a8f1d3f18a8432cf8c9366' },
        name: 'patitas',
        link: 'patitas.com',
        pnumber: '688688688',
        country: 'spain',
        region: 'madrid',
        __v: { $numberInt: '0' },
    },
    {
        _id: { $oid: '61a8f1eaf18a8432cf8c9369' },
        name: 'morros',
        link: 'morros.com',
        pnumber: '669669669',
        country: 'spain',
        region: 'madrid',
        __v: { $numberInt: '0' },
    },
];