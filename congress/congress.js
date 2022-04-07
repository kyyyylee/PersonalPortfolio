//import section
import { senators } from '../data/senators.js'
import { representatives } from '../data/representatives.js'
import { removeChildren } from '../utils/index.js';

//declaring variables for document
const main = document.querySelector("main");
const congressDiv = document.querySelector('.congressDiv')
const header = document.querySelector("header");

//senators all function
function simplifiedSenators() {
  return senators.map(sen => {
    const middleName = sen.middle_name ? ` ${sen.middle_name} ` : ` `
    return {
      id: sen.id,
      name: `${sen.first_name}${middleName}${sen.last_name}`,
      gender: sen.gender,
      party: sen.party,
      imgURL: `https://www.govtrack.us/static/legislator-photos/${sen.govtrack_id}-200px.jpeg`,
      seniority: +sen.seniority,
      state: sen.state,
      missedVotesPct: sen.missed_votes_pct,
      loyaltyPct: sen.votes_with_party_pct
    }
  })
}
function populateSenatorsDiv(senatorsArray) {
  removeChildren(congressDiv)
  senatorsArray.forEach(sen => {
    const senFigure = document.createElement('figure')
    const senImg = document.createElement('img')
    const senCaption = document.createElement('figcaption')
    senImg.src = sen.imgURL
    senCaption.textContent = sen.name
    senFigure.appendChild(senImg)
    senFigure.appendChild(senCaption)
    congressDiv.appendChild(senFigure)
  })
}
//senator button
const senButton = document.createElement("button");
senButton.textContent = "Senators";
senButton.addEventListener("click", function () {
  populateSenatorsDiv(simplifiedSenators())
});
header.appendChild(senButton);

//representatives function 

function populateRepresentativesDiv(representativesArray) {
  removeChildren(congressDiv)
  representativesArray.forEach(rep => {
    const repFigure = document.createElement('figure')
    const repImg = document.createElement('img')
    const repCaption = document.createElement('figcaption')

    repImg.src = rep.imgURL
    repCaption.textContent = rep.name

    repFigure.appendChild(repImg)
    repFigure.appendChild(repCaption)
    congressDiv.appendChild(repFigure)
  })
}
function simplifiedRepresentatives() {
  return representatives.map(rep => {
    const middleName = rep.middle_name ? ` ${rep.middle_name} ` : ` `
    return {
      id: rep.id,
      name: `${rep.first_name}${middleName}${rep.last_name}`,
      gender: rep.gender,
      party: rep.party,
      imgURL: `https://www.govtrack.us/static/legislator-photos/${rep.govtrack_id}-200px.jpeg`,
      seniority: +rep.seniority,
      state: rep.state,
      missedVotesPct: rep.missed_votes_pct,
      loyaltyPct: rep.votes_with_party_pct
    }
  })
}

//representatives button
const repButton = document.createElement("button");
repButton.textContent = "Representatives";
repButton.addEventListener("click", function () {
  populateRepresentativesDiv(simplifiedRepresentatives())
});
header.appendChild(repButton);

