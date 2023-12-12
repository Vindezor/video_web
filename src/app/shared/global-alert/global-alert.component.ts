import Swal from 'sweetalert2';
import { SweetAlertIcon } from 'sweetalert2';

interface AlertOptions {
    title: string,
    text?: string,
    cancelButton?: boolean,
    cancelButtonText?: string
    confirmButtonText?: string,
    showConfirmButton?: boolean,
    icon: SweetAlertIcon,
    html?: string,
}

/**
   * Método para mostrar la alerta.
   * @param title Titulo de la alerta.
   * @param text Subtítulo de la alerta.
   * @param icon Tipo de icon (warning, success, error).
   * @param html Cuerpo de la alerta.
   * @param cancelButton Mostrar botón de cancelar.
   * @param cancelButtonText Texto del botón cancelar.
   * @param confirmButton Mostrar botón de aceptar.
   * @param confirmButtonText Texto del botón aceptar.
*/
export function globalAlert(
    title: string,
    text: string,
    icon: SweetAlertIcon,
    html?: string,
    cancelButton?: boolean,
    cancelButtonText?: string,
    confirmButton?: boolean,
    confirmButtonText?: string,
) {
    return Swal.fire({
        html: html,
        title: title,
        text: text,
        icon: icon,
        confirmButtonColor: '#3f51b5',
        showConfirmButton: confirmButton == null ? true : confirmButton,
        confirmButtonText: confirmButtonText == null ? 'Aceptar' : confirmButtonText,
        showCancelButton: cancelButton,
        cancelButtonText: cancelButtonText,
        cancelButtonColor: '#f44336',
        reverseButtons: true,
        heightAuto: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
    });
}