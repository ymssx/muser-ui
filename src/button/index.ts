import { Brush, Element } from '../muser';

interface ButtonProps {
  text: string;
  action: Function;
}

export default class Button extends Element<ButtonProps> {
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
      const action = this.props.action;
      if (action instanceof Function) {
        action();
      }
    });
  }

  render({ props, state }: Button) {
    const PADDING = 12;
    const fontStyle = {
      font: '14pr normal',
    };

    return (brush: Brush) => {
      const { rect, text: fillText, measure } = brush;
      const { text } = props;
      const { activate } = state;

      const textMeasure = measure(text, fontStyle);
      rect([0, 0, textMeasure + 2 * PADDING, 40], {
        fillStyle: activate ? '#E3E3E3' : '#F2F2F2',
      });

      fillText(text, [0, 15], {
        ...fontStyle,
        fillStyle: '#121212',
        textBaseline: 'middle',
      });
    };
  }
}
