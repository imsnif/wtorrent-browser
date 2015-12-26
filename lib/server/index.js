"use strict";

import Container from 'export-di'

let di = new Container(__dirname)

let app = di.create("components/AppServer")
app.init()
