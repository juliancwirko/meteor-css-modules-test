### CSS Modules in Meteor

This is a working experiment. Just to test if this is possible (and it is ;)).

In Meteor we have the possibility to import CSS in .js files. These CSS contents are attached to the `<head>` tag in Meteor app.

I've used that functionality and modified `modules` package (for now only as local package in `/packages` folder)

### Run it!

```
$ git clone https://github.com/juliancwirko/meteor-css-modules-test.git
$ cd meteor-css-modules-test
$ npm install
$ meteor
```

### What I've done:

- I use postcss and [postcss-modules-scope](https://github.com/css-modules/postcss-modules-scope) to transform css contents
- I return :exports which are generated by postcss-modules-scope
- I also use [postcss-modules-local-by-default](https://github.com/css-modules/postcss-modules-local-by-default) so I don't have to write :local() declarations in css files

This all allows me to use pseudo CSS Modules in Meteor. You can find examples in this repo and below:

Example from Meteor React tutorial:

```javascript
import React, { Component, PropTypes } from 'react';

import style from './task.css';

// Task component - represents a single todo item
export default class Task extends Component {
  render() {
    return (
      <li className={style.test2}>{this.props.task.text}</li>
    );
  }
}

Task.propTypes = {
  task: PropTypes.object.isRequired,
};
```

As you can see I can import a .css file and then use it like: `className={style.classname}`. All css classes will be attached to the `<head>` and they will be changed to be uniq. Check out .css and .js files in this repo to test it. You can also clone it and run.

### What is not so cool:

- for now there isn't a separated package - there is only modified `modules` package in the `/packages` folder. There isn't a simple way to remove core `modules` package in Meteor
- for now there are no sourcemaps
- required .css files are attached to the `<head>` so in a big app it could be problematic.

### What could be improved:

- separated package published on Atmosphere
- posibility to use postcss configuration - so you will be able to use other syntaxes like .scss or other postcss plugins
- write as files/blobs (??)
