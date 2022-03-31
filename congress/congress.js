import { senators } from "../data/senators.js";

const senatorsDiv = document.querySelector(".senatorsDiv");
const seniorityHeader = document.querySelector('p')

function simpleSenators() {
  return senators.map((senator) => {
    const middleName = senator.middle_name ? ` ${senator.middle_name} ` : ` `;
    return {
      id: senator.id,
      name: `${senator.first_name}${middleName}${senator.last_name}`,
      gender: senator.gender,
      party: senator.party,
      imgURL: `https://www.govtrack.us/static/legislator-photos/${senator.govtrack_id}-200px.jpeg`,
      seniority: +senator.seniority,
      state: senator.state,
      missedVotesPct: senator.missed_votes_pct,
      loyaltyPct: senator.votes_with_party_pct,
    };
  });
}

function populateSenatorDiv(simpleSenators) {
  simpleSenators.forEach((senator) => {
    const senatorFig = document.createElement("figure");
    const senatorImg = document.createElement("img");
    const senatorCap = document.createElement("figcaption");

    senatorImg.src = senator.imgURL;
    senatorCap.textContent = senator.name;

    senatorFig.appendChild(senatorImg);
    senatorFig.appendChild(senatorCap);
    senatorsDiv.appendChild(senatorFig);
  });
  //TODO: create figure element with image and figcaption
  // set the image source to imgURL
  // append children to the DOM
}
populateSenatorDiv(simpleSenators());

const mostSeniorMember=simpleSenators().reduce((acc, senator) => acc.seniority > senator.seniority ? acc : senator)
seniorityHeader.textContent= `The most senior senator is ${mostSeniorMember.name}`