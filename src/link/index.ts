import { Brush, Element, ElementConfig } from '../muser';

interface LinkProps {
  href: string;
  text: string;
}

export default class Link extends Element<LinkProps> {
  constructor(config: ElementConfig) {
    super({
      ...config,
      alpha: true,
    });
  }

  state = {
    activate: false,
  };

  created() {
    this.addEventListener('in', () => {
      this.setState({
        activate: true,
      });
      this.changeCursor('pointer');
    });
    this.addEventListener('out', () => {
      this.setState({
        activate: false,
      });
      this.changeCursor('default');
    });
    this.addEventListener('click', () => {
      window.open(this.props?.href as string);
    });
  }

  render({ props, state }: Link) {
    const COLOR = '#3370ff';

    return [
      (brush: Brush) => {
        const { text: fillText } = brush;
        const { text } = props;

        fillText(text, [0, 15], {
          font: '14pr normal',
          fillStyle: COLOR,
          textBaseline: 'middle',
        });
      },
      (brush: Brush) => {
        const { line, measure, clearRect } = brush;
        const { text } = props;
        const { activate } = state;

        const width = measure(text, {
          font: '14pr normal',
          fillStyle: COLOR,
          textBaseline: 'middle',
        });

        if (activate) {
          line([0, 21.5, width, 21.5], {
            strokeStyle: COLOR,
            lineWidth: 1,
          });
        } else {
          clearRect([0, 21, width + 1, 2]);
        }
      },
    ];
  }
}
