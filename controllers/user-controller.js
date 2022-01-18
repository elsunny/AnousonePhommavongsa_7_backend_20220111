const express = require("express");
const jwt = require("jsonwebtoken");
const dotEnv = require("dotenv");
const cookie = require("cookie");
const { User } = require("../models");
const {
    setCookie,
    removeCookie,
    getPublicUser,
    getTokenUserId,
    getRoleUser,
} = require("../utils/fonctions");
const bcrypt = require("bcrypt");

// check form entries
const validator = require("email-validator");
const isValidPassword = require("is-valid-password");

// environnement variables
dotEnv.config({ path: "/config/.env" });

// check email and password
const checkEntries = (mail, pwd) =>
    Boolean(validator.validate(mail) && isValidPassword(pwd));

// define your password as this
// 8-32 characters
// at least one lowercase letter
// at least one uppercase letter
// at least 1 number
// optional special character [!@#$%^&*]

// signup record in database new user, hash the password and set cookie
exports.signup = async (req, res) => {
    try {
        const { pseudo, email, password, imageUser, description } = req.body;
        if (checkEntries(email, password)) {
            const salt = await bcrypt.genSalt();
            const hashPassword = await bcrypt.hash(password, salt);
            const user = await User.create({
                pseudo: pseudo,
                email: email,
                password: hashPassword,
                image: imageUser,
                description: description,
            });
            setCookie(user, res);
            res.status(201).send(getPublicUser(user));
        } else {
            res.status(400).json({
                message:
                    "veuillez vérifier vos saisies, le mot de passe doit contenir entre 8 et 32 caractères, au moins une lettre minuscule, 1 majuscule et 1 nombre",
            });
        }
    } catch (error) {
        res.status(404).json({ error });
    }
};

// check user when login
exports.login = async (req, res) => {
    try {
        const findUser = await User.findOne({
            where: { email: req.body.email },
        });
        if (findUser != null) {
            const validPassword = await bcrypt.compare(
                req.body.password,
                findUser.password
            );
            if (validPassword) {
                setCookie(findUser, res);
                res.status(200).send(getPublicUser(findUser));
            } else {
                res.status(401).json({ error: "mot de passe incorrect" });
            }
        } else {
            res.status(401).json({ error: "cet email est inconnu" });
        }
    } catch (error) {
        console.log("login catch error", error);
        res.status(404).json({ error });
    }
};

// logout the user
exports.logout = async (req, res) => {
    try {
        removeCookie(res);
        res.status(200).json({ message: "déconnexion" });
    } catch (error) {
        res.status(404).json({ error });
    }
};

// give all the registered users
exports.giveAllUsers = async (req, res) => {
    try {
        const allUsers = await User.findAll();
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(404).json({ error });
    }
};

// change user profile information
exports.change = async (req, res) => {
    try {
        // a session user can only change is own profile
        const profileUser = await User.findOne({
            where: { id: req.params.id },
        });
        const sessionUserId = getTokenUserId(req);
        if (profileUser.id === sessionUserId) {
            await User.update(
                {
                    pseudo: req.body.pseudo,
                    imageUser: req.body.imageUser,
                    description: req.body.description,
                },
                {
                    where: {
                        id: req.params.id,
                    },
                }
            );
            res.status(200).json({ message: "mise à jour de l'utilisateur" });
        }
        // check if user session has an admin role and can change the profile information
        else {
            const sessionRoleUser = await getRoleUser(sessionUserId, User);
            if (sessionRoleUser === "admin") {
                await User.update(
                    {
                        pseudo: req.body.pseudo,
                        imageUser: req.body.imageUser,
                        description: req.body.description,
                        role: req.body.description,
                    },
                    {
                        where: {
                            id: req.params.id,
                        },
                    }
                );
                res.status(200).json({
                    message: "mise à jour de l'utilisateur",
                });
            } else {
                res.status(200).json({
                    message: "vous ne pouvez pas changer ce profil",
                });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({ error });
    }
};

// suppression d'un compte utilisateur par l'admin
exports.removeUser = async (req, res) => {
    try {
        const sessionUserId = getTokenUserId(req);
        const sessionRoleUser = await getRoleUser(sessionUserId, User);
        if (sessionRoleUser === "admin") {
            await User.destroy({
                where: {
                    id: req.params.id,
                },
            });
            res.status(200).json({ message: "l'utilisateur a été supprimé" });
        } else {
            res.status(200).json({
                message: "vous n'êtes pas autorisé à supprimer l' utilisateur",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "un problème est survenu", error });
    }
};

// donne les informations à partir de l'id d'un user
exports.giveUserInfo = async (req, res) => {
    try {
        const userInfo = await User.findOne({
            where: { id: req.params.id },
        });
        res.header("cache-control", "max-age=5");
        res.status(200).send(getPublicUser(userInfo));
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "un problème est survenu" });
    }
};

// donne les informations sur le user de la session
exports.whoIsUser = async (req, res) => {
    try {
        const userSessionId = getTokenUserId(req);
        const userInfo = await User.findOne({
            where: { id: userSessionId },
        });
        res.status(200).send(getPublicUser(userInfo));
    } catch (error) {
        res.status(404).json({ message: "un problème est survenu" });
    }
};

// ajoute une image pour l'avatar
exports.avatarImageAdd = async (req, res) => {
    const id = getTokenUserId(req);
    let avatarUrl = "";
    if (req.file) avatarUrl = req.file.filename;
    console.log("avatar", avatarUrl);
    try {
        const userInfo = await User.findOne({
            where: { id: req.params.id },
        });
        if (avatarUrl) {
            userInfo.image = avatarUrl;
        }
        userInfo.pseudo = req.body.pseudo;
        userInfo.description = req.body.description;
        await userInfo.save();
        res.status(200).json({
            message: "la photo avatar a bien été enregistré",
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "un problème est survenu", error });
    }
};
