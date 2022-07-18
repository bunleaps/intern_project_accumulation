// IMPORT
import fs from "fs";

// =======================
// [    Start Program    ]
// =======================

// Take Data from 'data_input.txt'
const data = fs.readFileSync("./data_input.txt", "utf8");

// Transform Data to Array of Numbers
let data_transform = data
  .replace(/(?:\r\n|\r|\n)/g, "")
  .split(",")
  .map(function (item) {
    return parseInt(item);
  });

// Assigned Data to variable 'projects'
let projects = data_transform;

// ===================
// [    Variables    ]
// ===================
let resources = [
  {
    projects: 0,
    resources: 0,
    old_resources: 0,
    new_resources: 0,
    total_resources: 0,
  },
];

let old_offset = 0;
let new_offset = 0;
let total_sum = 0;

const each_resource = 8;

// ===========================
// [    Start Calculation    ]
// ===========================
for (let i = 0; i < projects.length; i++) {
  // resource(8) * projects => resources for the month
  let resource = each_resource * projects[i];
  // New resource add each months
  new_offset = resource;

  // Return -4 months & get old resources
  for (let num = 4; num < resources.length; num++) {
    // Reassigned Variable
    old_offset = resources[num - 3].resources;
    new_offset = resource - old_offset;

    // Instead of returning left over people; return 0
    if (new_offset < 0) {
      new_offset = 0;
    }
  }

  // Sum all new resources
  total_sum = total_sum + new_offset;

  // ========================
  // [    Final Assembly    ]
  // ========================
  resources.push({
    projects: projects[i],
    resources: resource,
    old_resources: old_offset,
    new_resources: new_offset,
    total_resources: total_sum,
  });
}

console.table(resources);
