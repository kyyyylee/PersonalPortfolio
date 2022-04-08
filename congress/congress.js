//import section
import { senators } from '../data/senators.js'
import { representatives } from '../data/representatives.js'
import { removeChildren } from '../utils/index.js';

//declaring variables for document
const congressDiv = document.querySelector('.congressDiv')
const congressHog = document.querySelector('.congressHog')
const allMembers = [...senators, ...representatives]
const buttonSection = document.querySelector('.buttons')

//populateDom function 
function populateDom(members) {
  removeChildren(congressDiv)
  members.forEach(member => {
    const memberFigure = document.createElement('figure')
    const memberImg = document.createElement('img')
    const memberCaption = document.createElement('figcaption')

    memberImg.src = member.imgURL
    memberCaption.textContent = member.name

    memberFigure.appendChild(memberImg)
    memberFigure.appendChild(memberCaption)
    congressDiv.appendChild(memberFigure)
  })
}
//MAP FUNCTION simple array
function simplifiedMembers(members) {
  return members.map(member => {
    const middleName = member.middle_name ? ` ${member.middle_name} ` : ` `
    return {
      id: member.id,
      name: `${member.first_name}${middleName}${member.last_name}`,
      gender: member.gender,
      party: member.party,
      imgURL: `https://www.govtrack.us/static/legislator-photos/${member.govtrack_id}-200px.jpeg`,
      seniority: +member.seniority,
      state: member.state,
      missedVotesPct: member.missed_votes_pct,
      loyaltyPct: member.votes_with_party_pct
    }
  })
}
//senator button
const senButton = document.createElement("button");
senButton.textContent = "Senators";
senButton.addEventListener("click",function () {
  populateDom(simplifiedMembers(senators))
});
buttonSection.appendChild(senButton);
//representatives button
const repButton = document.createElement("button");
repButton.textContent = "Representatives";
repButton.addEventListener("click", function () {
  populateDom(simplifiedMembers(representatives))
});
buttonSection.appendChild(repButton);
//FILTER FUNCTION republican button
const republicanMembers = allMembers.filter((republican) => republican.party == "R");
const republicanButton = document.createElement("button");
republicanButton.textContent = "Republican Members";
republicanButton.addEventListener("click", () => populateDom(simplifiedMembers(republicanMembers)));
buttonSection.appendChild(republicanButton);
//FILTER FUNCTION democrat button
const democraticMembers = allMembers.filter((democrat) => democrat.party == "D");
const democratButton = document.createElement("button");
democratButton.textContent = "Democrat Members";
democratButton.addEventListener("click", () => populateDom(simplifiedMembers(democraticMembers)));
buttonSection.appendChild(democratButton);
//REDUCE FUNCTION most senior member
const mostSeniorMember = simplifiedMembers(allMembers).reduce((acc, member) => acc.seniority > member.seniority ? acc : member)
console.log(mostSeniorMember.name)
congressHog.textContent=`The most senior member of congress is ${mostSeniorMember.name} who has been enjoying our tax dollars for ${mostSeniorMember.seniority} years!`
//all members loaded when page opens
populateDom(simplifiedMembers(allMembers))