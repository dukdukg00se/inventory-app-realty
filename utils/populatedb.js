#! /usr/bin/env node

console.log(
  'This script populates some test accounts, users, homes to the database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const User = require('./models/user');
const InteriorInfo = require('./models/interior-info');
const PropertyInfo = require('./models/property-info');
const CommunityInfo = require('./models/community-info');
const Home = require('./models/home');
const Account = require('./models/account');

const users = [];
const interiorInfos = [];
const propertyInfos = [];
const communityInfos = [];
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
  await createInteriorInfos();
  await createPropertyInfos();
  await createCommunityInfos();
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

async function interiorInfoCreate(
  index,
  bedrooms,
  bathrooms,
  kitchen,
  flooring,
  heating,
  cooling,
  appliances,
  other
) {
  const interiorInfoDetail = {
    bedrooms: bedrooms,
    bathrooms: bathrooms,
    kitchen: kitchen,
    flooring: flooring,
  };

  if (heating != false) interiorInfoDetail.heating = heating;
  if (cooling != false) interiorInfoDetail.heating = heating;
  if (appliances != false) interiorInfoDetail.appliances = appliances;
  if (other != false) interiorInfoDetail.other_features = other;

  const interiorInfo = new InteriorInfo(interiorInfoDetail);
  await interiorInfo.save();
  interiorInfos[index] = interiorInfo;
  console.log(`Added interior info number ${index}`);
}

async function propertyInfoCreate(
  index,
  parking,
  lot_size,
  construction_type,
  year_built,
  utilities,
  other
) {
  const propertyInfoDetails = {
    parking: parking,
    lot_size: lot_size,
    construction_type: construction_type,
    year_built: year_built,
    utilities: utilities,
  };
  if (other != false) propertyInfoDetails.other_features = other;

  const propertyInfo = new PropertyInfo(propertyInfoDetails);
  await propertyInfo.save();
  propertyInfos[index] = propertyInfo;
  console.log(`Added property info number ${index}`);
}

async function communityInfoCreate(index, community_features, region) {
  const communityInfoDetails = {
    community_features: community_features,
    region: region,
  };

  const communityInfo = new CommunityInfo(communityInfoDetails);
  await communityInfo.save();
  communityInfos[index] = communityInfo;
  console.log(`Added community info number ${index}`);
}

async function homeCreate(
  index,
  address,
  price,
  interior_info,
  property_info,
  community_info
) {
  const homeDetail = {
    address: address,
    price: price,
    interior_info: interior_info,
    property_info: property_info,
    community_info: community_info,
  };

  const home = new Home(homeDetail);
  await home.save();
  homes[index] = home;
  console.log(`Added home: ${address}`);
}

async function accountCreate(index, type, user, homes, created) {
  const accountDetail = {
    type: type,
    user: user,
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

async function createInteriorInfos() {
  console.log('Adding interior infos');

  await Promise.all([
    interiorInfoCreate(
      0,
      3,
      3,
      'Kitchen island, Granite counters',
      'Wood, Vinyl',
      'Forced air',
      'Central air'
    ),
    interiorInfoCreate(
      1,
      2,
      1,
      'Stone counters, Double sinks',
      'Vinyl',
      'Wood stove',
      'Wall unit'
    ),
    interiorInfoCreate(
      2,
      3,
      3,
      'Kitchen island, Stone counters, Soft-close cabinets',
      'Wood, Vinyl, Stone',
      'Forced Air',
      'Central Air',
      'Stainless steel refrigerator, Oven, Dishwasher',
      'Hot tub, Putting green'
    ),
    interiorInfoCreate(
      3,
      4,
      3,
      'Granite counters, Double ovens',
      'Wood laminate',
      'Forced Air',
      'Central Air',
      'Stainless steel appliances',
      'New water heater'
    ),
    interiorInfoCreate(
      4,
      2,
      1,
      'Stone counters, Wood cabinets',
      'Wood laminate',
      'Fireplace',
      'Central Air'
    ),
    interiorInfoCreate(
      5,
      3,
      1,
      'Kitchen Island',
      'Wood, Vinyl',
      false,
      'Central Air',
      false,
      'New wooden deck'
    ),
    interiorInfoCreate(
      6,
      2,
      2,
      'Marble counters, Wood cabinets',
      'Wood',
      false,
      false,
      false,
      false
    ),
    interiorInfoCreate(
      7,
      4,
      4,
      'Kitchen island, Marble counters, Double sinks, Double ovens, Wine cabinet',
      'Wood, Stone',
      'Forced Air',
      'Central Air',
      'Premium imported italian appliances',
      'Pool, Hot tub, Built-in BBQ'
    ),
  ]);
}

async function createPropertyInfos() {
  console.log('Adding property infos');

  await Promise.all([
    propertyInfoCreate(
      0,
      3,
      '2000 sqft',
      'Single Family',
      2003,
      {
        sewer: 'Public',
        water: 'Public',
      },
      'Gazebo, Patio'
    ),
    propertyInfoCreate(
      1,
      1,
      '1200 sqft',
      'Condo',
      1999,
      {
        sewer: 'Public',
        water: 'Public',
      },
      false
    ),
    propertyInfoCreate(
      2,
      2,
      '1800 sqft',
      'Single Family',
      2003,
      {
        sewer: 'Public',
        water: 'Public',
      },
      'Hot tub'
    ),
    propertyInfoCreate(
      3,
      4,
      '2400 sqft',
      'Single Family',
      2013,
      {
        sewer: 'Public',
        water: 'Public',
      },
      'Patio, Deck, Hot Tub, Pool, Fire pit'
    ),
    propertyInfoCreate(
      4,
      1,
      '1200 sqft',
      'Single Family',
      2000,
      {
        sewer: 'Septic',
        water: 'Well',
      },
      false
    ),
    propertyInfoCreate(
      5,
      2,
      '1500 sqft',
      'Townhome',
      2017,
      {
        sewer: 'Septic',
        water: 'Public',
      },
      'Fire pit, Sauna'
    ),
    propertyInfoCreate(
      6,
      1,
      '1500 sqft',
      'Townhome',
      1996,
      {
        sewer: 'Septic',
        water: 'Well',
      },
      false
    ),
    propertyInfoCreate(
      7,
      5,
      '2800 sqft',
      'Single Family',
      2020,
      {
        sewer: 'Public',
        water: 'Public',
      },
      'Deck, River access'
    ),
  ]);
}

async function createCommunityInfos() {
  console.log('Adding community infos');

  await Promise.all([
    communityInfoCreate(0, 'Biking, Curbs, Hiking, Street lights', 'Irvine'),
    communityInfoCreate(1, 'Park, Street lights', 'Irvine'),
    communityInfoCreate(
      2,
      'Biking, Curbs, Hiking, Street lights, Park',
      'Irvine'
    ),
    communityInfoCreate(3, 'Lake, Fishing, Street lights', 'Aliso Viejo'),
    communityInfoCreate(4, 'Biking, Curbs, Park, Street lights', 'Irvine'),
    communityInfoCreate(5, 'Street lights', 'Costa Mesa'),
    communityInfoCreate(6, 'Biking, Curbs, Hiking', 'Costa Mesa'),
    communityInfoCreate(7, 'Hiking, Street lights', 'Lake Forest'),
  ]);
}

async function createHomes() {
  console.log('Adding Homes');

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
    accountCreate(0, 'White Glove', users[0], [
      homes[0],
      homes[1],
      homes[2],
      false,
    ]),
    accountCreate(1, 'Basic', users[1], false, false),
    accountCreate(2, 'Basic', users[2], [homes[3]], false),
    accountCreate(3, 'Guided', users[3], [homes[4], homes[5]], false),
    accountCreate(4, 'Basic', users[4], [homes[1], homes[6], homes[7]], false),
  ]);
}

console.log(accounts[1]);
