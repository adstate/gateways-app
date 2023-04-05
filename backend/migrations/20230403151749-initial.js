module.exports = {
  async up(db, client) {
    const devices = await db.collection('devices').insertMany([
      {
        uid: 1111,
        vendor: 'HP',
        created: new Date().toISOString(),
        status: 'online',
      },
      {
        uid: 2222,
        vendor: 'HP',
        created: new Date().toISOString(),
        status: 'online',
      },
      {
        uid: 3333,
        vendor: 'Huawei',
        created: new Date().toISOString(),
        status: 'online',
      },
    ]);

    const devices2 = await db.collection('devices').insertMany([
      {
        uid: 4444,
        vendor: 'HP',
        created: new Date().toISOString(),
        status: 'online',
      },
      {
        uid: 5555,
        vendor: 'HP',
        created: new Date().toISOString(),
        status: 'online',
      },
      {
        uid: 6666,
        vendor: 'Huawei',
        created: new Date().toISOString(),
        status: 'online',
      },
    ]);

    return await db.collection('gateways').insertMany([
      {
        serialNumber: 'AR0910AA0021',
        name: 'gateway1',
        ipAddress: '192.168.10.12',
        devices: Object.values(devices.insertedIds),
      },
      {
        serialNumber: 'AR0910AA0022',
        name: 'gateway2',
        ipAddress: '192.168.8.12',
        devices: Object.values(devices2.insertedIds),
      },
    ]);
  },

  async down(db, client) {
    const gateway1 = await db
      .collection('gateways')
      .findOne({ serialNumber: 'AR0910AA0021' });

    db.collection('devices').deleteMany({ _id: { $in: gateway1.devices } });

    const gateway2 = await db
      .collection('gateways')
      .findOne({ serialNumber: 'AR0910AA0022' });

    db.collection('devices').deleteMany({ _id: { $in: gateway2.devices } });

    const gatewayIds = [gateway1, gateway2].map((g) => g._id);

    return db.collection('gateways').deleteMany({ _id: { $in: gatewayIds } });
  },
};
