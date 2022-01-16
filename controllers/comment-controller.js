const express = require("express");
const jwt = require("jsonwebtoken");
const { User, Comment } = require("../models");
const {
    getTokenUserId,
    areIdentique,
    removeDataFromDB,
    getRoleUser,
} = require("../utils/fonctions");

// affiche tout les commentaires d'un média
exports.commentDisplayAll = async (req, res) => {
    try {
        const allComment = await Comment.findAll({
            where: {
                mediumId: req.params.mediaId,
            },
        });
        allComment != null
            ? res.status(200).json(allComment)
            : console.log("sorry no comments");
    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.commentAdd = async (req, res) => {
    const { message } = req.body;
    const id = getTokenUserId(req);
    try {
        const comment = await Comment.create({
            MediumId: parseInt(req.params.mediaId, 10),
            UserId: id,
            message,
        });
        res.status(200).send(comment);
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "un problème est survenu", error });
    }
};

// efface un commentaire
exports.commentRemove = async (req, res) => {
    try {
        const comment = await Comment.findOne({
            where: {
                id: req.params.id,
            },
        });
        // check if user session has an admin or moderator role and can delete media
        if (
            ["admin", "moderator"].includes(req.user.role) ||
            comment.UserId === req.user.id
        ) {
            await comment.destroy();
            res.status(200).json({
                message: "le média a été supprimé",
            });
        } else {
            res.status(401).json({
                message:
                    "vous ne pouvez pas supprimer le commentaire créé par un autre utilisateur",
            });
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "un problème est survenu" });
    }
};
