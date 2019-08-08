import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'

import * as Icon from 'react-feather';

export default class AudioPlayer extends Component {
  constructor(props) {
    super(props);
    this.togglePlay = this.togglePlay.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
    this.chooseSong = this.chooseSong.bind(this);
    this.minimise = this.minimise.bind(this);
    this.audio = React.createRef();
    this.actualProgress = React.createRef();
    this.progress = React.createRef();
    this.state = {
      isPlaying: false,
      minimised: false,
      currentTime: 0,
      currentTrack: {name: '', artist: '', source: '', color: '#F2F2F2'},
      data: this.props.data,
      id: 0,
    }
  }

  static propTypes = {
    text: PropTypes.string
  }

  componentDidMount() {
    this.setState({
      currentTrack: this.state.data.tracks[0],
      id: 0,
    })
    this.audio.addEventListener('loadeddata', () => {
      this.setState({
        currentTime: this.audio.currentTime,
        duration: this.audio.duration,
      });
    });
    this.audio.addEventListener('timeupdate', () => {
      const currentTime = this.audio.currentTime;
      const duration = this.audio.duration;
      this.setState({
        currentTime: currentTime,
        duration: duration,
      });
      this.progress.value = currentTime/duration*100;
    });
    this.audio.addEventListener('ended', () => { 
      this.handleNext(); 
      this.togglePlay(); 
    });
  }

  handleProgress(event) {
    if(this.state.isPlaying===true) {
      this.togglePlay();
      this.actualProgress.value = event.target.value;
      this.progress.value = event.target.value;
      this.audio.currentTime = (event.target.value*this.state.duration)/100;
      this.togglePlay();
    } else {
      this.actualProgress.value = event.target.value;
      this.progress.value = event.target.value;
      this.audio.currentTime = (event.target.value*this.state.duration)/100;
    }
  }

  togglePlay() {
    if(window.scrollY>1) {
      window.scroll(0, 0);
      this.setState({isPlaying: true});
      this.audio.play();
    }
    if (this.state.isPlaying===false) {
      this.setState({isPlaying: true});
      this.audio.play();
    } else {
      this.setState({isPlaying: false});
      this.audio.pause();
    }
  }

  minimise() {
    this.setState({
      minimised: !this.state.minimised,
    })
  }

  formatSeconds(s) {
    return (s-(s%=60))/60+(9<s?':':':0')+s;
  }

  chooseSong(number) {
    this.setState({
      currentTrack: this.state.data.tracks[number],
      isPlaying: false,
      id: number,
    }, ()=> {
      this.audio.pause();
      this.audio.load();
      this.progress.defaultValue = 1;
    })
  }

  handleNext() {
    if(this.state.id<this.state.data.tracks.length-1) {
      this.chooseSong(this.state.id+=1);
    }
  }

  handlePrev() {
    if(this.state.id>0) {
      this.chooseSong(this.state.id-=1);
    }
  }

  render() {
    return (
      <div className={styles.wrapper}>

        <div className={styles.track}>
          <div className={styles.trackMeta}>
            <h1 className={styles.title}>
              {[...Array(7)].map((e, i) => i!==1 ? <span className={styles.title} key={i}>{this.state.currentTrack.name} {this.state.currentTrack.artist} </span> : <span className={styles.titleColored} key={i} style={{color: this.state.currentTrack.color}}>{this.state.currentTrack.name}<span className={styles.subtitleColored} style={{color: this.state.currentTrack.color}}> {this.state.currentTrack.artist} </span></span>)}
            </h1>
          </div>
        </div>

        <div className={styles.timestamp}>
          <div className={styles.time}>{this.state.currentTime ? this.formatSeconds(Math.floor(this.state.currentTime)) : '0:00'}</div>
          <div className={styles.time}>{Math.floor(this.state.duration) ? this.formatSeconds(Math.floor(this.state.duration)) : '0:00'}</div>
        </div>

        <div className={styles.player}>

          <progress className={styles.progress} value={this.state.duration ? (this.state.currentTime / this.state.duration) * 100 : 0} max='100' ref={(actualProgress) => { this.actualProgress = actualProgress }} style={{backgroundColor: this.state.currentTrack.color}}>15%</progress>
          <input type='range' step='0.1' onChange={this.handleProgress} min='0' max='100' defaultValue={0} className={styles.slider} ref={(progress) => { this.progress = progress }} />

          <div className={styles.playerIcons}>
            <div className={styles.icon} onClick={this.handlePrev}><Icon.SkipBack /></div>
            <div className={styles.icon} onClick={this.togglePlay} style={{display: this.state.isPlaying ? 'none' : 'inherit'}}><Icon.Play /></div>
            <div className={styles.icon} onClick={this.togglePlay} style={{display: this.state.isPlaying ? 'inherit' : 'none'}}><Icon.Pause /></div>
            <div className={styles.icon} onClick={this.handleNext}><Icon.SkipForward /></div>
          </div>

          <audio id='' title='' poster='' ref={(audio) => { this.audio = audio }}>
            <source src={this.state.currentTrack.source} type='audio/mpeg' />
          </audio>

          <div className={styles.playlistIcon} onClick={this.minimise} style={{display: this.state.minimised ? 'none' : 'inherit'}}><Icon.X /></div>
          <div className={styles.playlistIcon} onClick={this.minimise} style={{display: this.state.minimised ? 'inherit' : 'none'}}><Icon.List /></div>

        </div>

        <div className={styles.playlist} style={{display: this.state.minimised ? 'none' : 'inherit'}}>
          {
            this.state.data.tracks.map((song, id)=>{
              return (
                <div className={styles.playlistTrack} onClick={this.chooseSong.bind(null, id)} style={{background: this.state.currentTrack.name===song.name ? this.state.currentTrack.color : ''}}>
                  <div>{song.name} - {song.artist}</div>
                  <div>{}</div>
                </div>
              )
            })
          }
          
        </div>

      </div>
    )
  }
}
