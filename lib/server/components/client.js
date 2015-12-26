"use strict";

import WebTorrent from 'webtorrent';

export const singleton = true
export default function Client (){
  // TODO: add config
  return new WebTorrent()
}
