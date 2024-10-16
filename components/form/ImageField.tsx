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
        className="border border-gray-300 p-2 w-full"
      />
    </div>
  );
};
export default ImageField;
