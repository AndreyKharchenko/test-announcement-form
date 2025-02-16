import { FC, useRef } from 'react'
import { IPhotoUploader } from './types'
import './style.css'
import { useController, useFieldArray, useFormContext } from 'react-hook-form'
import Camera from '../../../assets/camera.svg'
import Close from '../../../assets/close.svg'

export const PhotoUploader: FC<IPhotoUploader> = (props) => {
  const { name, limit } = props
  const { control, setError, clearErrors } = useFormContext()
  const { field, fieldState } = useController({ name })
  const { error } = fieldState
  const { ref, onChange } = field
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(limit && fields.length >= limit) {
      setError("images", {message: `Максимальное количество изображений ${fields.length}`})
    }
    const files = e.target.files;
    if (files && files.length > 0) {
        const file = files[0]; 
        append({ file });
        onChange([...fields, {file}]);
    }
  }

  const handleRemovePhoto = (id: number) => {
    remove(id)
    if(limit && fields.length - 1 <= limit) {
      clearErrors("images")
    }
  }

  return (
    <div>
      <div className="uploader-wrapper">
        {fields.map((field) => (
          <div key={field.id} className="preview">
            <img src={field?.file ? URL.createObjectURL(field?.file) : ''}  />
            <div className="close-btn" onClick={() => handleRemovePhoto(field.id)}>
              <img src={Close} />
            </div>
          </div>
        ))}
        <div className="uploader" onClick={handleClick}>
          <input
            type="file"
            ref={(el) => {
              ref(el);
              fileInputRef.current = el;
            }}
            onChange={handleFileChange}
            accept="image/png, image/gif, image/jpeg"
          />

          <img src={Camera} className="uploader-camera" />
        </div>
      </div>
      {error && <p className="error">{error?.message}</p>}
      {limit && fields.length != 0 && <div className="limit">{fields.length} из {limit}</div>}
    </div>
  )
}