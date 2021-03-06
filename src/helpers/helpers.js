export function sortByName(a, b) {
  const nameA = a.name_en.toLowerCase()
  const nameB = b.name_en.toLowerCase()
  if (nameA > nameB) {
    return 1
  } else if (nameA < nameB) {
    return -1
  } else {
    return 0
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
function sortByNps(a, b) {
  if (a.rate_count - b.rate_count < 0) {
    return 1
  } else if (a.rate_count - b.rate_count > 0) {
    return -1
  } else {
    return sortByName(a, b)
  }
}

function sortByRating(a, b) {
  if (a.average_p_rate - b.average_p_rate < 0) {
    return 1
  } else if (a.average_p_rate - b.average_p_rate > 0) {
    return -1
  } else {
    return sortByName(a, b)
  }
}

export default function sort(array, sortBy) {
  return array.sort((a, b) => {
    if (sortBy === "name") {
      return sortByName(a, b)
    } else if (sortBy === "nps") {
      return sortByNps(a, b)
    } else {
      return sortByRating(a, b)
    }
  })
}

export function reverseString(string) {
  if (typeof string) {
    return string
      .split("")
      .reverse()
      .join("")
  } else {
    throw new Error("reverseString function expects a string")
  }
}

export function appendToFormData(values) {
  const formData = new FormData()
  for (const key in values) {
    if (values[key] !== undefined && values[key] !== null) {
      formData.append(key, values[key])
    }
  }
  return formData
}

export function logFormData(formData) {
  for (let pair of formData.entries()) {
    console.log(pair[0] + "  =>  " + pair[1])
  }
}

export function debounce(func, wait, immediate) {
  var timeout
  return function() {
    var context = this,
      args = arguments
    var later = function() {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    var callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}
