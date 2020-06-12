import React, { Component } from "react";
import PropTypes from "prop-types";
import { configure, BarcodePicker as ScanditSDKBarcodePicker } from "scandit-sdk";

// Configure the library and activate it with a license key
const configurationPromise = configure(
  "AQwu+RkmBl9MFixs4SOOt7UdpWJKRNo1alN82oxvErpSSQZS/AgIHTFMMwDrXWdcG1XqyrA2Atu8Gmv7qhy/yTJ7gGPhSJaIFXcsgLw0Jp63QWfAaSuZddg1qEnArYHvrjzsU4roe6zD+dTABqb9Pb0OMQMFTjSc3+c0T/P92HLpVbtYEwEWchR+bdwYmsnCt5DiigeqBAezI2795uwmLVmFo9vJIj0nH3wPC6+ncIyBoXCZC3rcoHJlVB+OPdwyZ4skr1VFmGMy2rFGcYAADo2ZveB3yE3S2VRHOKv6U1vobMRcZsSv9IpK2Juj0vlm/O14plI/buj0mmrGVBgwaI+kUjtKLZ4bim9lYwTtNspzNgZuPaXg/LMpKyIns5Pn+AQ1InTbbQgkKZW2ZULM4vf2NQ7Kbq+gA1IGgs1FJyPjQlMDM5h5RoQQMt0GH8Zw3OEghRucemI5kVudwCgwqS/KhMbgQHLPIgWSrprxh4f+vFO+QnCqsV1eJu2lVCCAKXgAtSUXZsswt6FyAniTzzpYi+n1baR9wbSuwxthxEI/hxQW6L76+tCNQ6Ij/2D8Y4Dv9RFlDeCiPLUrTip/rIDKMski6RuiqEy/kHpp87oA6QT0JcfwBh1BFrZmqbOrbV417I3N40PeU/g5wk79oh75xuPQmgGURQtfxUADa2b5vOb1WxXguLoGDztlMokGa8+Do6aaZHs2z063FqSf5rRjaHE8Wo7PIj60Fulv9CAhZylXsR91NqEp0WYggOoPj8J2gltwt0CKsOOFITMsKnm8LKoyugWbuBKy", {
    engineLocation:'https://cdn.jsdelivr.net/npm/scandit-sdk/build'
  }
).catch((error) => {
  console.error(error);
});


class BarcodePicker extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    playSoundOnScan: PropTypes.bool,
    vibrateOnScan: PropTypes.bool,
    scanningPaused: PropTypes.bool,
    guiStyle: PropTypes.string,
    videoFit: PropTypes.string,
    scanSettings: PropTypes.object,
    enableCameraSwitcher: PropTypes.bool,
    enableTorchToggle: PropTypes.bool,
    enableTapToFocus: PropTypes.bool,
    enablePinchToZoom: PropTypes.bool,
    accessCamera: PropTypes.bool,
    camera: PropTypes.object,
    cameraSettings: PropTypes.object,
    targetScanningFPS: PropTypes.number,
    onScan: PropTypes.func,
    onError: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount() {
    configurationPromise.then(() => {
      ScanditSDKBarcodePicker.create(this.ref.current, this.props).then((barcodePicker) => {
        this.barcodePicker = barcodePicker;
        if (this.props.onScan != null) {
          barcodePicker.on("scan", this.props.onScan);
        }
        if (this.props.onError != null) {
          barcodePicker.on("scanError", this.props.onError);
        }
      });
    });
  }

  componentWillUnmount() {
    if (this.barcodePicker != null) {
      this.barcodePicker.destroy();
    }
  }

  componentDidUpdate(prevProps) {
    // These are just some examples of how to react to some possible property changes

    if (JSON.stringify(prevProps.scanSettings) !== JSON.stringify(this.props.scanSettings)) {
      this.barcodePicker.applyScanSettings(this.props.scanSettings);
    }

    if (prevProps.visible !== this.props.visible) {
      this.barcodePicker.setVisible(this.props.visible);
    }
  }

  render() {
    return <div ref={this.ref} className='wrapper-scanner' />;
  }
}

export default BarcodePicker;
