#! /usr/bin/env node

console.log(
  'This script populates some test accounts, users, homes to the database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const User = require('../models/user');
const Home = require('../models/home');
const Account = require('../models/account');

const users = [];
const homes = [];
const accounts = [];

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log('Debug: About to connect');
  await mongoose.connect(mongoDB);
  console.log('Debug: Should be connected?');

  await createUsers();
  await createHomes();
  await createAccounts();

  console.log('Debug: Closing mongoose');
  mongoose.connection.close();
}

// Functions to create single doc model:
// Index used to keep order regardless of when promise completes
// within the fns to populate data
async function userCreate(index, first_name, last_name, email) {
  const userDetail = {
    first_name: first_name,
    last_name: last_name,
    email: email,
  };

  const user = new User(userDetail);

  await user.save();
  users[index] = user;
  console.log(`Added user: ${first_name} ${last_name}`);
}

async function homeCreate(
  index,
  address,
  price,
  interior_info,
  property_info,
  community_info
) {
  const interiorInfoDetails = {
    bedrooms: interior_info.bedrooms,
    bathrooms: interior_info.bathrooms,
    kitchen: interior_info.kitchen,
    flooring: interior_info.flooring,
  };

  if (interior_info.heating != false)
    interiorInfoDetails.heating = interior_info.heating;
  if (interior_info.cooling != false)
    interiorInfoDetails.cooling = interior_info.cooling;
  if (interior_info.appliances != false)
    interiorInfoDetails.appliances = interior_info.appliances;
  if (interior_info.other_features != false)
    interiorInfoDetails.other_features = interior_info.other_features;

  const propertyInfoDetails = {
    parking: property_info.parking,
    lot_size: property_info.lot_size,
    construction_type: property_info.construction_type,
    year_built: property_info.year_built,
    utilities: property_info.utilities,
  };

  if (property_info.other_features != false)
    propertyInfoDetails.other_features = property_info.other_features;

  const communityInfoDetails = {
    community_features: community_info.community_features,
    region: community_info.region,
  };

  const homeDetails = {
    address: address,
    price: price,
    interior_info: interiorInfoDetails,
    property_info: propertyInfoDetails,
    community_info: communityInfoDetails,
  };

  const home = new Home(homeDetails);
  await home.save();
  homes[index] = home;
  console.log(`Added home: ${address}`);
}

async function accountCreate(index, type, users, homes, created) {
  const accountDetail = {
    type: type,
    users: users,
  };

  if (homes != false) accountDetail.homes = homes;
  if (created != false) accountDetail.created = created;

  const account = new Account(accountDetail);
  await account.save();
  accounts[index] = account;
  console.log(`Added a ${type} account`);
}

// Functions to populate some test data within each collection:
async function createUsers() {
  console.log('Adding users');

  await Promise.all([
    userCreate(0, 'James', 'Smith', 'js@yahoo.com'),
    userCreate(1, 'Mary', 'Jane', 'mj@gmail.com'),
    userCreate(2, 'Tom', 'DeBlass', 'td@hotmail.com'),
    userCreate(3, 'Stacy', 'Smith', 'ss@gmail.com'),
    userCreate(4, 'Jaden', 'Highers', 'js@gmail.com'),
  ]);
}

async function createHomes() {
  console.log('Adding Homes');
  const interiorInfos = [
    {
      bedrooms: 3,
      bathrooms: 3,
      kitchen: 'Kitchen island, Granite counters',
      flooring: 'Wood, Vinyl',
      heating: 'Forced air',
      cooling: 'Central air',
      applicances: false,
      other_features: false,
    },
    {
      bedrooms: 2,
      bathrooms: 1,
      kitchen: 'Stone counters, Double sinks',
      flooring: 'Vinyl',
      heating: 'Wood stove',
      cooling: 'Wall unit',
      appliances: false,
      other_features: false,
    },
    {
      bedrooms: 3,
      bathrooms: 3,
      kitchen: 'Kitchen island, Stone counters, Soft-close cabinets',
      flooring: 'Wood, Vinyl, Stone',
      heating: 'Forced Air',
      cooling: 'Central Air',
      appliances: 'Stainless steel refrigerator, Oven, Dishwasher',
      other_features: 'Hot tub, Putting green',
    },
    {
      bedrooms: 4,
      bathrooms: 3,
      kitchen: 'Granite counters, Double ovens',
      flooring: 'Wood laminate',
      heating: 'Forced Air',
      cooling: 'Central Air',
      appliances: 'Stainless steel appliances',
      other_features: 'New water heater',
    },
    {
      bedrooms: 2,
      bathrooms: 1,
      kitchen: 'Stone counters, Wood cabinets',
      flooring: 'Wood laminate',
      heating: 'Fireplace',
      cooling: 'Central Air',
      appliances: false,
      other_features: false,
    },
    {
      bedrooms: 3,
      bathrooms: 1,
      kitchen: 'Kitchen Island',
      flooring: 'Wood, Vinyl',
      heating: false,
      cooling: 'Central Air',
      appliances: false,
      other_features: 'New wooden deck',
    },
    {
      bedrooms: 2,
      bathrooms: 2,
      kitchen: 'Marble counters, Wood cabinets',
      flooring: 'Wood',
      heating: false,
      cooling: false,
      appliances: false,
      other_features: false,
    },
    {
      bedrooms: 4,
      bathrooms: 4,
      kitchen: 'Island, Marble counters, Double ovens, Wine cabinet',
      flooring: 'Wood, Stone',
      heating: 'Forced Air',
      cooling: 'Central Air',
      appliances: 'Premium imported italian appliances',
      other_features: false,
    },
  ];
  const propertyInfos = [
    {
      parking: 3,
      lot_size: '2000 sqft',
      construction_type: 'Single Family',
      year_built: 2003,
      utilities: {
        sewer: 'Public',
        water: 'Public',
      },
      other_features: 'Gazebo, Patio',
    },
    {
      parking: 1,
      lot_size: '1200 sqft',
      construction_type: 'Condo',
      year_built: 1999,
      utilities: {
        sewer: 'Public',
        water: 'Public',
      },
      other_features: false,
    },
    {
      parking: 2,
      lot_size: '1800 sqft',
      construction_type: 'Single Family',
      year_built: 2003,
      utilities: {
        sewer: 'Public',
        water: 'Public',
      },
      other_features: 'Hot tub',
    },
    {
      parking: 4,
      lot_size: '2400 sqft',
      construction_type: 'Single Family',
      year_built: 2013,
      utilities: {
        sewer: 'Public',
        water: 'Public',
      },
      other_features: 'Patio, Deck, Hot Tub, Pool, Fire pit',
    },
    {
      parking: 1,
      lot_size: '1200 sqft',
      construction_type: 'Single Family',
      year_built: 2000,
      utilities: {
        sewer: 'Septic',
        water: 'Well',
      },
      other_features: false,
    },
    {
      parking: 2,
      lot_size: '1500 sqft',
      construction_type: 'Townhome',
      year_built: 2017,
      utilities: {
        sewer: 'Septic',
        water: 'Public',
      },
      other_features: 'Fire pit, Sauna',
    },
    {
      parking: 1,
      lot_size: '1500 sqft',
      construction_type: 'Townhome',
      year_built: 1996,
      utilities: {
        sewer: 'Septic',
        water: 'Well',
      },
      other_features: false,
    },
    {
      parking: 5,
      lot_size: '2800 sqft',
      construction_type: 'Single Family',
      year_built: 2020,
      utilities: {
        sewer: 'Public',
        water: 'Public',
      },
      other_features: 'Deck, River access',
    },
  ];
  const communityInfos = [
    {
      community_features: 'Biking, Curbs, Hiking, Street lights',
      region: 'Irvine',
    },
    {
      community_features: 'Park, Street lights',
      region: 'Irvine',
    },
    {
      community_features: 'Biking, Curbs, Hiking, Street lights, Park',
      region: 'Irvine',
    },
    {
      community_features: 'Lake, Fishing, Street lights',
      region: 'Aliso Viejo',
    },
    {
      community_features: 'Biking, Curbs, Park, Street lights',
      region: 'Irvine',
    },
    {
      community_features: 'Street lights',
      region: 'Costa Mesa',
    },
    {
      community_features: 'Biking, Curbs, Hiking',
      region: 'Costa Mesa',
    },
    {
      community_features: 'Hiking, Street lights',
      region: 'Lake Forest',
    },
  ];

  await Promise.all([
    homeCreate(
      0,
      '17400 Teach Ave, Irvine, CA 92111',
      1908888,
      interiorInfos[0],
      propertyInfos[0],
      communityInfos[0]
    ),
    homeCreate(
      1,
      '2300 Charming Ave, Irvine, CA 92321',
      2100000,
      interiorInfos[1],
      propertyInfos[1],
      communityInfos[1]
    ),
    homeCreate(
      2,
      '32 Hummingbird, Irvine, CA 96290',
      750000,
      interiorInfos[2],
      propertyInfos[2],
      communityInfos[2]
    ),
    homeCreate(
      3,
      '1582 Canopy St, Aliso Viejo, CA 42771',
      1100000,
      interiorInfos[3],
      propertyInfos[3],
      communityInfos[3]
    ),
    homeCreate(
      4,
      '23 Bloomingdale Ave, Irvine, CA 92617',
      950000,
      interiorInfos[4],
      propertyInfos[4],
      communityInfos[4]
    ),
    homeCreate(
      5,
      '8740 Height Ave, Costa Mesa, CA 52419',
      1000000,
      interiorInfos[5],
      propertyInfos[5],
      communityInfos[5]
    ),
    homeCreate(
      6,
      '33 Dover Way, Costa Mesa, CA 52419',
      500000,
      interiorInfos[6],
      propertyInfos[6],
      communityInfos[6]
    ),
    homeCreate(
      7,
      '173 Canopy Dr, Lake Forest, CA 33341',
      650000,
      interiorInfos[7],
      propertyInfos[7],
      communityInfos[7]
    ),
  ]);
}

async function createAccounts() {
  console.log('Adding accounts');

  await Promise.all([
    accountCreate(
      0,
      'White Glove',
      [users[0]],
      [homes[0], homes[1], homes[2]],
      false
    ),
    accountCreate(1, 'Basic', [users[1]], false, false),
    accountCreate(2, 'Basic', [users[2]], [homes[3]], false),
    accountCreate(3, 'Guided', [users[3]], [homes[4], homes[5]], false),
    accountCreate(
      4,
      'Basic',
      [users[4]],
      [homes[1], homes[6], homes[7]],
      false
    ),
  ]);
}
