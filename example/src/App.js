import React, { Component } from 'react'

import AudioPlayer from 'react-audioplaylist'
import * as Icon from 'react-feather';
import ReactJson from 'react-json-view'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        tracks: [
          {
            name: 'Uncatena',
            artist: 'Sylvan Esso',
            source: 'https://storage.googleapis.com/jrmyphlmn/music/uncatena.mp3',
            color: '#F96300'
          },
          {
            name: 'Hold Me Down',
            artist: 'Dean Lewis',
            source: 'https://storage.googleapis.com/jrmyphlmn/music/hold%20me%20down.mp3',
            color: '#E62F0B'
          },
          {
            name: 'Only You',
            artist: 'Jim Charles Moody',
            source: 'https://storage.googleapis.com/jrmyphlmn/music/only%20you.mp3',
            color: '#4C1749'
          }
        ]
      }
    }
  }

  render () {
    return (
      <div className="universe">
        <div className="header"><Icon.Package class={'feather-icon'} size={32} />react-audioplaylist</div>
        <div className="meta">
          <div className="tag">v1.0.1</div>
          <a className="tag npm" href='https://www.npmjs.com/package/@jeremyphilemon/react-audioplaylist'>npm</a>
          <a className="tag github" href='https://github.com/jeremyphilemon/react-audioplaylist'>GitHub</a>
        </div>
        <div class="component-wrapper">
          <div className="tag preview">Preview</div>
          <AudioPlayer data={this.state.data} />
        </div>
        <div className="instructions">
          <div className="title">Installation</div>
            <blockquote><span className="shell">$</span>npm i @jeremyphilemon/react-audioplaylist</blockquote>
          <div className="title">Usage</div>
            <p>1. Import the component.</p>
            <blockquote>import AudioPlayer from 'react-audioplaylist'</blockquote>
            <p>2. Add the component and pass the track details as prop.</p>
            <blockquote>{`<AudioPlayer data={this.state.data} />`}</blockquote>
          <div className="title">Props Specification</div>
            <p>Here's the json specification used to pass as prop.</p>
            <ReactJson src={this.state.data} collapseStringsAfterLength={20} enableClipboard={false} style={{marginTop: '1rem', fontFamily: 'Apercu'}}/>
        </div>
        <div className="footer">
          <img src="https://jrmyphlmn.com/logo.png" />
          <p className="disclaimer">
            Songs used above are purely for demo purposes only.<br/> 
            I do not own them, respective songs belong to respective artists.
          </p>
        </div>
      </div>
    )
  }
}
