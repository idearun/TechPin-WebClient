export function sortByName(a,b) {
  const nameA = a.name_en.toLowerCase()
  const nameB = b.name_en.toLowerCase()
  if (nameA > nameB) {
    return 1;
  } else if (nameA < nameB) {
    return -1;
  } else {
    return 0;
  }
}

//this is the real nps sort method
// function sortByNps(a,b) {
//   if ((a.n_p_score - b.n_p_score) < 0) {
//     return 1;
//   } else if ((a.n_p_score - b.n_p_score) > 0) {
//     return -1;
//   } else {
//     return sortByName(a,b)
//   }
// }

//this is temporary sort method for nps
function sortByNps(a,b) {
  if ((a.rate_count - b.rate_count) < 0) {
    return 1;
  } else if ((a.rate_count - b.rate_count) > 0) {
    return -1;
  } else {
    return sortByName(a,b)
  }
}

function sortByRating(a,b) {
  if ((a.average_p_rate - b.average_p_rate) < 0) {
    return 1;
  } else if ((a.average_p_rate - b.average_p_rate) > 0) {
    return -1;
  } else {
    return sortByName(a,b)
  }
}

export default function sort(array, sortBy) {
  return array.sort((a, b) => {
    if (sortBy === 'name') {
      return sortByName(a, b);
    } else if (sortBy === 'nps') {
      return sortByNps(a, b);
    } else {
      return sortByRating(a, b);
    }
  })
}
