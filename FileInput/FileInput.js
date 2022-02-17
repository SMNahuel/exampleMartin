import { useState } from 'react';
import Files from 'react-files';
import styles from './FileInput.module.css';
import { onFilesUpload } from '../../../firebase/index';
import Loader from 'react-loader-spinner';

const FileInput = ({ submit, name }) => {
  const fileTypes = ['image/png', 'image/jpg', 'image/jpeg'];
  const [filename, setFilename] = useState('');
  const [loading, setLoading] = useState({
    spinner: false,
  });

  const onFilesChange = async files => {
    setLoading({ ...loading, spinner: true });
    setFilename(files[0].name);
    onFilesUpload(submit, name, files, handleSpinner);
  };
  const handleSpinner = () => {
    setLoading({ ...loading, spinner: false });
  };
  return (
    <Files
      className={styles.Input}
      accepts={fileTypes}
      onChange={onFilesChange}
      maxFileSize={10000000}
      minFileSize={0}
      cickable
    >
      <div className={styles.ContainerInput}>
        <p className={styles.InputSelect}>Cargar archivo</p>
        {loading.spinner && (
          <Loader
            type="TailSpin"
            color="#5089c6"
            height={30}
            width={100}
            timeout={5000}
            visible={true}
          />
        )}
        {!loading.spinner && (
          <p className={styles.InputText}>
            {filename !== '' ? filename : 'Ningún archivos seleccionado'}
          </p>
        )}
      </div>
    </Files>
  );
};

export default FileInput;
