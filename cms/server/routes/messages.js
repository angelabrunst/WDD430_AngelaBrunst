var express = require('express');
var router = express.Router();

const sequenceGenerator = require('./sequenceGenerator');
const Message = require('../models/message');

router.get('/', (req, res, next) => {
    Message.find()
    .exec(function(err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        return res.status(200).json(result);
    });

});

router.post('/', (req, res, next) => {
    const maxDocumentId = sequenceGenerator.nextId("messages");

    const message = new Message({
        id: maxDocumentId,
        subject: req.body.subject,
        msgText: req.body.msgText,
        sender: '101'
    });
    
    message.save()
        .then(createdMessage => {
            res.status(201).json({
                message: 'Message added successfully',
                newMessage: createdMessage
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
              message: 'An error occurred',
              error: error
            });
        });
});

router.put('/:id', (req, res, next) => {
    Message.findOne({ id: req.params.id })
      .then(message => {
        message.subject = req.body.subject;
        message.msgText = req.body.msgText;
  
        Message.updateOne({ id: req.params.id }, message)
          .then(result => {
            res.status(204).json({
              message: 'Message updated successfully'
            })
          })
          .catch(error => {
             res.status(500).json({
               message: 'An error occurred',
               error: error
           });
          });
      })
      .catch(err => {
        res.status(500).json({
          message: 'Message not found.',
          error: { message: 'Message not found'}
        });
      });
});

router.delete("/:id", (req, res, next) => {
    Message.findOne({ id: req.params.id })
      .then(message => {
        Message.deleteOne({ id: req.params.id })
          .then(result => {
            res.status(204).json({
              message: "Message deleted successfully"
            });
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          })
      })
      .catch(error => {
        res.status(500).json({
          message: 'Message not found.',
          error: { message: 'Message not found'}
        });
      });
  });


module.exports = router;  