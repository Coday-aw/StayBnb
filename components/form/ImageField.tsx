interface ImageFieldProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageField: React.FC<ImageFieldProps> = ({ onChange }) => {
  return (
    <div>
      <label className="text-lg font-bold">Image</label>
      <input
        type="file"
        onChange={onChange}
        name="image"
        className=" p-2 w-full border rounded-lg mt-1"
      />
    </div>
  );
};
export default ImageField;
