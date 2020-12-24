//IE 8
if (!Function.prototype.bind) {
  Function.prototype.bind = function (oThis) {
    if (typeof this !== "function") {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var aArgs = Array.prototype.slice.call(arguments, 1),
      fToBind = this,
      fNOP = function () { },
      fBound = function () {
        return fToBind.apply(this instanceof fNOP && oThis ? this : oThis,
          aArgs.concat(Array.prototype.slice.call(arguments)));
      };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
  };
}

(function () {
  var defaultConfig = {
    content: [
      {
        type: 'row',
        content: [
          {
            width: 80,
            type: 'column',
            content: [
              {
                title: 'Fnts 100',
                type: 'component',
                componentName: 'stockGrid',
              },
              {
                type: 'row',
                content: [
                  {
                    type: 'component',
                    title: 'Golden',
                    componentName: 'fibonacci-spiral',
                    width: 30
                  },
                  {
                    title: 'Layout',
                    type: 'component',
                    componentName: 'gl-text'
                  },
                  {
                    title: 'Iframe Example',
                    type: 'component',
                    componentName: 'iframe-example'
                  },
                  // {
                  //   type:'react-component',
                  //   component: 'testComponent',
                  //   props: { label: 'X' }
                  // }
                ]
              },
              {
                type: 'stack',
                content: [
                  {
                    type: 'component',
                    title: 'Acme, inc.',
                    componentName: 'stockChart',
                    componentState: {
                      companyName: 'Stock X'
                    }
                  },
                  {

                    type: 'component',
                    title: 'LexCorp plc.',
                    componentName: 'stockChart',
                    componentState: {
                      companyName: 'Stock Y'
                    }
                  },
                  {
                    type: 'component',
                    title: 'Springshield plc.',
                    componentName: 'stockChart',
                    componentState: {
                      companyName: 'Stock Z'
                    }
                  }
                ]
              }
            ]
          },
          {
            width: 20,
            type: 'column',
            content: [
              {
                type: 'component',
                title: 'Performance',
                componentName: 'columnChart'
              },
              {
                height: 40,
                type: 'component',
                title: 'Market',
                componentName: 'pieChart'
              }
            ]
          }
        ]
      }
    ]
  };

  var myLayout;
  var savedState = localStorage.getItem('savedState');
  var config = savedState ? JSON.parse(savedState) : defaultConfig;

  var myLayout = new GoldenLayout(config, '#exampleLayoutContainer');
  window.myLayout = myLayout;




  myLayout.on('stateChanged', function () {
    var state = JSON.stringify(myLayout.toConfig());
    localStorage.setItem('savedState', state);
  });

  myLayout.init();
})();
