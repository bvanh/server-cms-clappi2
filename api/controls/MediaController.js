"use strict";
const listErr = require("../ultils/errorStatus");
const fs = require("fs");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);
const Media = require("../models/Media");
const cloudinary = require("cloudinary").v2;
const attributes = require("../ultils/attributes");
const { getPagination, getPagingData } = require("./services");
const { off } = require("process");
const { CLOUD_NAME, CLOUD_KEY, CLOUD_SECRET } = process.env;
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_KEY,
  api_secret: CLOUD_SECRET,
});
const { CLIENT_ERROR, CLOUDINARY_ERROR, SERVER_ERROR } = listErr;
const { media } = attributes;
module.exports = {
  getImages: async (req, res) => {
    try {
      const { page, size } = req.query;
      const { limit, offset } = getPagination(page, size);
      Media.findAndCountAll({
        attributes: media,
        limit: limit,
        offset: offset,
      })
        .then((data) => {
          const response = getPagingData(data, page, limit);
          res.status(200).send(response);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving tutorials.",
          });
        });
    } catch (e) {
      console.log(e);
    }
  },
  upload: async (req, res) => {
    try {
      const { path, originName } = req.file;
      cloudinary.uploader.upload(
        path,
        {
          format: "jpg",
          folder: "cms_clappi",
        },
        (err, result) => {
          const {
            secure_url,
            original_filename,
            bytes,
            format,
            public_id,
          } = result;
          Media.create({
            name: original_filename,
            url: secure_url,
            type: format,
            size: bytes,
            public_id: public_id,
          }).then((data) => {
            if (data) {
              res.json(data);
            } else {
              res.status(400).send("Error in insert new record");
            }
          });
          // console.log(result);
          unlinkAsync(req.file.path);
        }
      );
    } catch (error) {
      console.log(error);
    }
  },
  delete: (req, res) => {
    try {
      const { img_id } = req.body;
      cloudinary.uploader.destroy(img_id, (error, result) => {
        switch (result.result) {
          case "ok":
            res.json(result);
            break;
          case "not found":
            res.status(CLOUDINARY_ERROR).send({ message: "image not found" });
            break;
          default:
            res.status(CLOUDINARY_ERROR).send({ message: "cloud_error" });
            break;
        }
      });
    } catch (err) {
      res.status(SERVER_ERROR).send({ message: "server_error" });
    }
  },
};
