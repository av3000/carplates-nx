const _db = require('../models');
const Carplate = _db.carplates;
const Op = _db.Sequelize.Op;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.plate_name) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }

  // Create a Carplate
  const newCarplate = {
    plate_name: req.body.plate_name,
    owner: req.body.owner,
  };

  // Save Carplate in the database
  Carplate.create(newCarplate)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Carplate.',
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Carplate.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Carplate was updated successfully.',
        });
      } else {
        res.send({
          message: `Cannot update Carplate with id=${id}. Maybe Carplate was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Carplate with id=' + id,
      });
    });
};

exports.findAll = (req, res) => {
  const plate_name = req.query.plate_name;
  const condition = plate_name
    ? { plate_name: { [Op.like]: `%${plate_name}%` } }
    : null;

  Carplate.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving carplates.',
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Carplate.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Carplate with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Carplate with id=' + id,
      });
    });
};

exports.deleteOne = (req, res) => {
  const id = req.params.id;

  Carplate.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Carplate was deleted successfully!',
        });
      } else {
        res.send({
          message: `Cannot delete Carplate with id=${id}. Maybe Carplate was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Carplate with id=' + id,
      });
    });
};

const carplatesFakeData = [
  {
    id: '7648dcdd-c25b-404c-b0fd-dff529b0bcda',
    name: 'AAA-000',
    owner: 'John Doe',
  },
  {
    id: 'f7d9b239-0cca-4494-8bb0-d25bc9a6c8d5',
    name: 'AAA-001',
    owner: 'John Doe',
  },
  {
    id: '96719518-0c8d-4788-ae80-3f57e56045fe',
    name: 'AAA-002',
    owner: 'John Doe',
  },
  {
    id: '390dddfd-94bb-411d-ae81-3357fdf8a0bf',
    name: 'AAA-003',
    owner: 'John Doe',
  },
  {
    id: '8a95edf9-d4c3-499f-941d-44f5ac0473e6',
    name: 'AAA-004',
    owner: 'John Doe',
  },
  {
    id: '1ec9d09a-6b3a-4112-99d9-29113120c20e',
    name: 'AAA-005',
    owner: 'John Doe',
  },
  {
    id: 'e03a5783-d8ca-4442-9482-55a31a3ab822',
    name: 'AAA-006',
    owner: 'John Doe',
  },
  {
    id: '77af7bf5-658f-4ab0-9c14-47eca238e3fd',
    name: 'AAA-007',
    owner: 'John Doe',
  },
  {
    id: '227abc46-82d3-438e-8ae8-9d3a2a95340e',
    name: 'AAA-008',
    owner: 'John Doe',
  },
  {
    id: '140c02d8-074c-4538-b368-415566086319',
    name: 'AAA-009',
    owner: 'John Doe',
  },
  {
    id: '2be0574e-1256-4ea4-b7ef-0aa2fbdb315b',
    name: 'BBB-010',
    owner: 'John Doe',
  },
  {
    id: '68889a38-25a3-495e-95a9-3a77c8c4e629',
    name: 'BBB-011',
    owner: 'John Doe',
  },
  {
    id: '57c95d79-db53-49e3-82d0-a0823c414654',
    name: 'BBB-012',
    owner: 'John Doe',
  },
  {
    id: '3dac3c82-01bf-4da7-8211-9629c1cae8ff',
    name: 'BBB-013',
    owner: 'John Doe',
  },
  {
    id: '2c0a4f05-7586-4eef-9172-2a8247c4966c',
    name: 'BBB-014',
    owner: 'John Doe',
  },
  {
    id: 'e7643e0a-88c5-47e2-8411-ea9f727db26b',
    name: 'BBB-015',
    owner: 'John Doe',
  },
  {
    id: 'e9999e0a-88c5-47e2-8411-ea9f727db26b',
    name: 'BBB-016',
    owner: 'John Doe',
  },
  {
    id: 'e8888e0a-88c5-47e2-8411-ea9f727db26b',
    name: 'BBB-017',
    owner: 'John Doe',
  },
  {
    id: 'e7777e0a-88c5-47e2-8411-ea9f727db26b',
    name: 'BBB-018',
    owner: 'John Doe',
  },
  {
    id: 'e6666e0a-88c5-47e2-8411-ea9f727db26b',
    name: 'BBB-019',
    owner: 'John Doe',
  },
  {
    id: 'e5555e0a-88c5-47e2-8411-ea9f727db26b',
    name: 'CCC-020',
    owner: 'John Doe',
  },
  {
    id: 'e4444e0a-88c5-47e2-8411-ea9f727db26b',
    name: 'CCC-100',
    owner: 'John Doe',
  },
  {
    id: 'e3333e0a-88c5-47e2-8411-ea9f727db26b',
    name: 'CCC-101',
    owner: 'John Doe',
  },
  {
    id: 'e2222e0a-88c5-47e2-8411-ea9f727db26b',
    name: 'CCC-102',
    owner: 'John Doe',
  },
  {
    id: 'e1111e0a-88c5-47e2-8411-ea9f727db26b',
    name: 'CCC-103',
    owner: 'John Doe',
  },
  {
    id: 'e0000e0a-88c5-47e2-8411-ea9f727db26b',
    name: 'CCC-104',
    owner: 'John Doe',
  },
  {
    id: 'e0dwe0e0a-88c5-47e2-8411-ea9f727db999',
    name: 'CCC-999',
    owner: 'John Doe',
  },
  {
    id: 'e0dwe0e0a-88c5-47e2-8411-ea9f727db888',
    name: 'CCC-888',
    owner: 'John Doe',
  },
  {
    id: 'e0dwe0e0a-88c5-47e2-8411-ea9f727db777',
    name: 'CCC-777',
    owner: 'John Doe',
  },
  {
    id: 'e0dwe0e0a-88c5-47e2-8411-ea9f727db666',
    name: 'CCC-666',
    owner: 'John Doe',
  },
];
