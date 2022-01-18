const express = require("express");
const jwt = require("jsonwebtoken");
const { Media, User } = require("../models");
// const CommentModel = require("../models/media-model");
const {
    getTokenUserId,
    areIdentique,
    removeDataFromDB,
    getRoleUser,
    getPseudoUser,
} = require("../utils/fonctions"); // les accolades permettent de récupérer une fonction précise dans le fichier

// affiche toutes les photos ou videos
exports.mediaDisplayAll = async (req, res) => {
    try {
        const allMedia = await Media.findAll({
            order: [["createdAt", "DESC"]],
        });
        res.status(200).json(allMedia);
    } catch (error) {
        res.status(404).json({ error });
    }
};

// ajout d'une photo ou d'une video
exports.mediaAdd = async (req, res) => {
    const { title, description } = req.body;
    const id = getTokenUserId(req);
    let mediaUrl = "";
    req.file ? (mediaUrl = req.file.filename) : mediaUrl; 
    try {
        const media = await Media.create({
            title,
            description,
            filename: mediaUrl,
            UserId: id,
        });
        res.status(200).send(media);
    } catch (error) {
        res.status(404).json({ message: "un problème est survenu", error });
    }
};

// affiche un média sélectionné
exports.mediaDisplayOne = async (req, res) => {
    try {
        const foundOneMedia = await Media.findByPk(req.params.id);
        res.status(200).json(foundOneMedia);
    } catch (error) {
        res.status(404).json({ message: "un problème est survenu", error });
    }
};

// efface un média et tous les commentaires attachés
exports.mediaRemove = async (req, res) => {
    try {
        // user doit avoir créer le commentaire pour pouvoir le supprimer
        if (await areIdentique(req, Media)) {
            await removeDataFromDB(req, Media);
            res.status(200).json({ message: "votre média a été supprimé" });
        } else {
            // check if user session has an admin or moderator role and can delete media
            const sessionRoleUser = await getRoleUser(
                getTokenUserId(req),
                User
            );
            if (
                sessionRoleUser === "admin" ||
                sessionRoleUser === "moderator"
            ) {
                await removeDataFromDB(req, Media);
                res.status(200).json({
                    message: "le média a été supprimé",
                });
            } else {
                res.status(200).json({
                    message:
                        "vous ne pouvez pas supprimer le média créé par un autre utilisateur",
                });
            }
        }
    } catch (error) {
        res.status(404).json({ message: "un problème est survenu", error });
    }
};
