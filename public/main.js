//var source = $("#some-template").html();
var source = document.querySelector('#some-template').innerHTML;
var template = Handlebars.compile(source);

var data = {
    sorting: {
      header: 'artist',
      direction: 'up'
    },
    users: [ {
        person: {
            firstName: "Formally Known As",
            lastName: "Prince"
    },
        age: "150",
        networth: "1 trillion"
    }, {
        person: {
          firstName: "Madonna",
          lastName: ""
        },

        age: "75",
        networth: "19 billion"
    }, {
        person: {
          firstName: "2 Pac",
          lastName: "Shakur"

        },
        age: "Deceased",
        networth: "Unknown"
    }, {
      person: {
        firstName: "Britney",
        lastName: "Spears"
    },
      age: "35",
      networth: "55 Million"
    }, {
      person: {
        firstName: "Will",
        lastName: "Pharell"
      },
        age: "33",
        networth: "in super models"
      },]
};

Handlebars.registerHelper('fullName', function(person) {
  return person.firstName + " " + person.lastName;
});

Handlebars.registerHelper('arrow', function(headerId) {
  if (headerId == data.sorting.header) {
    return new Handlebars.SafeString('<img src="../assets/arrow-' + data.sorting.direction + '.gif" />');
  }
  return "";
});

// sorting
function changeSort(ev) {
  // determine what was clicked and which way it's currently being sorted (asc / desc)
  console.log(ev.target.id)

  if (ev.target.id == data.sorting.header) {
    // data.sorting.direction = (data.sorting.direction == 'up' ? 'down' : 'up')
    if (data.sorting.direction == 'up') {
      data.sorting.direction = 'down';
    } else {
      data.sorting.direction = 'up';
    }
  } else {
    data.sorting.header = ev.target.id;
    data.sorting.direction = 'up'
  }

  mySexySort();

  // change to the opposite sort direction
  // make sure it re-rerenders
  render();
}

function mySexySort() {
  var header = data.sorting.header;
  var direction = data.sorting.direction;
  var neo;
  switch (header) {
    case 'artist':
      neo = orderBy.artist;
      break;
    case 'age':
      neo = orderBy.age;
      break;
    case 'networth':
      neo = orderBy.netWorth;
      break;
    default:
      console.log("Whoops. WTF?!")
  }
  data.users.sort(neo)
}

// sorting functions
var orderBy = {
  artist: function (a, b) {
      if (data.sorting.direction == 'down') { b = [a, a = b][0] }
      var result;
      var aName = a.person.firstName + a.person.lastName;
      var bName = b.person.firstName + b.person.lastName;
      if (aName < bName) {
        result = -1
      }
      if (aName > bName) {
        result = 1
      }
      if (aName == bName) {
        result = 0
      }
      return result;
  },
  age: function (a, b) {
    if (data.sorting.direction == 'down') {   }
    var result;
    if (a.age < b.age) {
      result = -1
    }
    if (a.age > b.age) {
      result = 1
    }
    if (a.age == b.age) {
      result = 0
    }
    return result;
  },
  netWorth: function (a, b) {
    if (data.sorting.direction == 'down') { b = [a, a = b][0] }
    var result;
    if (a.networth < b.networth) {
      result = -1
    }
    if (a.networth > b.networth) {
      result = 1
    }
    if (a.networth == b.networth) {
      result = 0
    }
    return result;
  }
}


function render() {
  document.querySelector('#artist-table-container').innerHTML = template(data);
  document.querySelector('#thead').addEventListener("click", changeSort);
}

render();
