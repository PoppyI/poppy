### Building Your Copy of Poppy

The process to build poppy is built using ionic framework, angularjs, & firebase.

### Prerequisites
We also use a number of node.js tools to initialize poppy. You must have node.js and
its package manager (npm) installed.  You can get them from [http://nodejs.org/](http://nodejs.org/).

### Clone Poppy
Clone the poppy repository using git:

```
git clone https://github.com/sgatson/poppy.git
cd poppy
```
### Install Dependencies

We have two kinds of dependencies in this project: tools and angular framework code.  The tools help
us manage and test the application.

* We get the tools we depend upon via `npm`, the [node package manager][npm].
* We get the angular code via `bower`, a [client-side code package manager][bower].

We have preconfigured `npm` to automatically run `bower` so we can simply do:

```
npm install
```

Behind the scenes this will also call `bower install`.

You’ll also need to install ionic’s command line utility to easily run the application.

```
npm install -g ionic
```

To host the application on Firebase you'll need to install the Firebase command line tools.

```
npm install -g firebase-tools
```

### Configure the Application
 1. Open `www/js/config.js` and set the value of FBURL constant to your Firebase URL
 1. Go to your Firebase dashboard and enable email/password authentication under the Auth tab
 1. import the contents of `init-db.json` into your data tab, which is also under your Firebase dashboard.

### Run the Application

The simplest way to start the server is:

```
ionic serve
```
