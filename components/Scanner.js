import React, { Component } from "react";
import PropTypes from "prop-types";
import { configure, BarcodePicker as ScanditSDKBarcodePicker, ScanSettings } from "scandit-sdk";

// Configure the library and activate it with a license key
// const configurationPromise = configure(
//   "AQwu+RkmBl9MFixs4SOOt7UdpWJKRNo1alN82oxvErpSSQZS/AgIHTFMMwDrXWdcG1XqyrA2Atu8Gmv7qhy/yTJ7gGPhSJaIFXcsgLw0Jp63QWfAaSuZddg1qEnArYHvrjzsU4roe6zD+dTABqb9Pb0OMQMFTjSc3+c0T/P92HLpVbtYEwEWchR+bdwYmsnCt5DiigeqBAezI2795uwmLVmFo9vJIj0nH3wPC6+ncIyBoXCZC3rcoHJlVB+OPdwyZ4skr1VFmGMy2rFGcYAADo2ZveB3yE3S2VRHOKv6U1vobMRcZsSv9IpK2Juj0vlm/O14plI/buj0mmrGVBgwaI+kUjtKLZ4bim9lYwTtNspzNgZuPaXg/LMpKyIns5Pn+AQ1InTbbQgkKZW2ZULM4vf2NQ7Kbq+gA1IGgs1FJyPjQlMDM5h5RoQQMt0GH8Zw3OEghRucemI5kVudwCgwqS/KhMbgQHLPIgWSrprxh4f+vFO+QnCqsV1eJu2lVCCAKXgAtSUXZsswt6FyAniTzzpYi+n1baR9wbSuwxthxEI/hxQW6L76+tCNQ6Ij/2D8Y4Dv9RFlDeCiPLUrTip/rIDKMski6RuiqEy/kHpp87oA6QT0JcfwBh1BFrZmqbOrbV417I3N40PeU/g5wk79oh75xuPQmgGURQtfxUADa2b5vOb1WxXguLoGDztlMokGa8+Do6aaZHs2z063FqSf5rRjaHE8Wo7PIj60Fulv9CAhZylXsR91NqEp0WYggOoPj8J2gltwt0CKsOOFITMsKnm8LKoyugWbuBKy", {
//     engineLocation:'https://cdn.jsdelivr.net/npm/scandit-sdk/build'
//   }
// ).catch((error) => {
//   console.error(error);
// });


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
    configure(
      "AclfRyWFOpT/Dx8+gjAdWhARENDRBdFqV3ExkRB8vmWyW+Y76yQf+/xp7hPwYXcRPHmuEl1XlErzK86Pp0BTaaNzX9HkLIYBQ09I9dl8pvkORDBA9VvssyNofKIJVFeK7kX3G7VE5YuuBz5cbCbMPRkLhkqzs4H6MnMTsPUY6FrepSEiZn1fj9KxY8wT9sXIGL2t4/0v4qkWuCzhbGo7vWFd9Fuht/QBw/T2SAcYdgz3v7pEm4snOVnyLYf//VK9Y4uWA1imzIvpJRswgkYGQ6sUIuxgYuVYfa6b1PZ8gYRCH9eP6XkS0Pe/yDKTmPfaO7nwu9yAcYzfHsKOJA4S4vdWRya/TQU0EOlrLN0kVbHQ0Ws+fAQdDqzBizIPor/n1WENAJNP3w58G7+/GxbXL+I2o3S8404E7zKWE+PrcijFTOwTMPGQXPVLYeIelgoenQwmK/aXrAPtkqFt0Ihjs3gphUZhLDAYsyMGQrhAJk1DsNMyYmJTPfKXOty9bqZo2kS16hXIq5MxTIZ2MRafefzaMQojxwh8kwOCqhRTiwLRLIRMpso1u5elq3k6cfTkJntIrJxBRECunIuW2VVQSohMm8LylRMhaJlC7g4InsYKaacinF1/Q4HXTkHUGxo1RuuugE+kq3GB3dFWXgEH7q3buSAXqU/30i1YYs7q/3LQ4z+Zz6SbaosWcDftHaDvvPaW7AadDrx48PoGvKB2uJMJ5PT93R4wRnefJy5RgYOviFuphyb+nLdsnQhimIGAy6NLr1mDUs+/4e6nUVQpVtH0t1N1oWP8rU73z8/pLVD/Ki/DFTqYS+2BeNquoPeO", {
        engineLocation:'https://cdn.jsdelivr.net/npm/scandit-sdk/build'
      }
    ).then(() => {
      ScanditSDKBarcodePicker.create(this.ref.current, this.props).then((barcodePicker) => {
        this.barcodePicker = barcodePicker;
        const config = new ScanSettings({
          enabledSymbologies: ['qr', 'ean8', 'ean13', 'upca', 'upce', 'code128', 'code39', 'code93', 'itf'],
          codeDuplicateFilter: 1000
        })
        this.barcodePicker.applyScanSettings(config)
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
    return <div ref={this.ref} />;
  }
}

export default BarcodePicker;
