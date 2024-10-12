import Swal from 'sweetalert2'
import './styles.css'

const Toast = Swal.mixin({
  toast: true,
  position: 'center',
  iconColor: 'white',
  customClass: {
    popup: 'colored-toast',
  },
  timer: 2000,
  timerProgressBar: true,
  showConfirmButton: false,
});

export default Toast;