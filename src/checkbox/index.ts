import { Brush, Element } from '../muser';

interface CheckboxProps {
  value: boolean;
  onChange: Function;
}

export default class Checkbox extends Element<CheckboxProps> {
  created() {
    this.addEventListener('click', () => {
      const { value, onChange = () => {} } = this.props;
      onChange(!value);
    });
    this.addEventListener('in', () => {
      this.changeCursor('pointer');
    });
    this.addEventListener('out', () => {
      this.changeCursor('default');
    });
  }

  render({ props }: Checkbox) {
    const COLOR = '#3370ff';

    return (brush: Brush) => {
      const { rect, lines, clear } = brush;
      const { value } = props;

      clear();

      rect([0, 0, '100%', '100%'], {
        fillStyle: value ? COLOR : '#FFF',
        strokeStyle: value ? '#FFF' : COLOR,
      });

      if (value) {
        lines(
          [
            ['20%', '50%', '40%', '70%'],
            ['40%', '70%', '80%', '20%'],
          ],
          { strokeStyle: '#fff', lineWidth: 2 }
        )
      }
    };
  }
}
