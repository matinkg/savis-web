import { request } from "@/configs/HTTPService";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  productDetailsValue,
  selectedColorDataValue,
} from "@/configs/constants";

export default function useFetchData() {
  const [data, setData] = useState<any>(productDetailsValue);
  const [loading, setLoading] = useState(false);
  const [selectedSize, setSelectedSize] = useState<any>("");
  const [sizeText, setSizeText] = useState<any>("سایز");
  const [selectedColor, setSelectedColor] = useState<any>("");
  const [selectedColorData, setSelectedColorData] = useState<any>(
    selectedColorDataValue,
  );
  const [availableSizes, setAvailableSizes] = useState([]);
  const [colors, setColors] = useState<any>([]);
  const [selectedVariations, setSelectedVariations] = useState<any>(null);
  const [variationsData, setVariationsData] = useState<any>(null);

  const params = useParams();
  const { id } = params;

  const fetchDataFromServer = () => {
    setLoading(true);
    request(`/api/v1/products/${id}`)
      .then((res) => {
        if (!res?.error) {
          setData(res?.data);

          const variations = res?.data?.product?.variations || [];
          setVariationsData(variations);
          const uniqueColors = [
            ...new Set(res?.data?.attributes?.colors),
          ].filter(Boolean);
          setColors(uniqueColors);
          const uniqueSizes = [...new Set(res?.data?.attributes?.sizes)].filter(
            Boolean,
          );
          const text = variations[0]?.attributes?.find(
            (attr: any) => attr.name === "سایز" || attr.name === "طول",
          )?.name;
          setSizeText(text);

          if (uniqueColors.length > 0) {
            const defaultColor: any = uniqueColors[0];
            setSelectedColor(defaultColor.value);

            const colorVariations = variations.filter((v: any) =>
              v.attributes.some(
                (attr: any) =>
                  attr.name === "رنگ" &&
                  attr?.value?.id === defaultColor?.id &&
                  attr?.value?.value === defaultColor?.value,
              ),
            );

            if (colorVariations.length > 0) {
              const defaultSizeVariation = colorVariations[0];
              const defaultSize = defaultSizeVariation.attributes.find(
                (attr: any) => attr.name === "سایز" || attr.name === "طول",
              )?.value;

              setSelectedSize(defaultSize || "");
              if (defaultSize) {
                setAvailableSizes(colorVariations);
              }
              setSelectedVariations(defaultSizeVariation);
              setSelectedColorData({
                color: defaultColor.value,
                gallery: defaultSizeVariation.gallery || [],
                stock: defaultSizeVariation.stock || 0,
                price: defaultSizeVariation.price || 0,
                color_name: defaultColor.value,
              });
            }
          } else if (uniqueSizes.length > 0) {
            const defaultSize: any = uniqueSizes[0];
            setSelectedSize(defaultSize);
            setAvailableSizes(variations);
            const sizeVariations = variations.filter((v: any) =>
              v.attributes.some(
                (attr: any) =>
                  (attr.name === "سایز" || attr.name === "طول") &&
                  attr?.value?.id === defaultSize?.id &&
                  attr?.value?.value === defaultSize?.value,
              ),
            );
            setSelectedVariations(sizeVariations[0]);
            if (sizeVariations.length > 0) {
              setSelectedColorData({
                color: "",
                gallery: sizeVariations[0]?.gallery || [],
                stock: sizeVariations[0]?.stock || 0,
                price: sizeVariations[0]?.price || 0,
              });
            }
          }

          setLoading(false);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchDataFromServer();
  }, []);

  const handleSizeClick = (size: any) => {
    const sizeData: any = availableSizes.find((v: any) => {
      return v.attributes?.some(
        (attr: any) =>
          (attr.name === "سایز" || attr.name === "طول") &&
          attr?.value?.id === size,
      );
    });

    setSelectedVariations(sizeData);
    const newSize = sizeData?.attributes?.find(
      (sd: any) => sd.name === "سایز" || sd.name === "طول",
    )?.value;

    setSelectedSize(newSize);

    const sizeVariations = data?.product?.variations?.filter((v: any) =>
      v.attributes.some(
        (attr: any) =>
          (attr.name === "سایز" || attr.name === "طول") &&
          attr.value?.value === size?.value?.value,
      ),
    );

    if (sizeVariations.length > 0) {
      const defaultColorVariation = sizeVariations.find((v: any) =>
        v.attributes.some((attr: any) => attr.name === "رنگ"),
      );

      const defaultColor = defaultColorVariation?.attributes.find(
        (attr: any) => attr.name === "رنگ",
      )?.value;

      setSelectedColor(defaultColor?.value || "");
      setSelectedColorData({
        color: defaultColor?.value || "",
        gallery: sizeVariations[0]?.gallery || [],
        stock: sizeVariations[0]?.stock || 0,
        price: sizeVariations[0]?.price || 0,
      });
    }
  };

  const handleColorClick = (color: string) => {
    setSelectedColor(color);

    const colorVariations = variationsData?.filter((v: any) =>
      v.attributes.some(
        (attr: any) => attr.name === "رنگ" && attr?.value?.value === color,
      ),
    );

    if (colorVariations.length > 0) {
      const selectedVariation = colorVariations[0];

      setSelectedVariations(selectedVariation);

      setSelectedColorData({
        color,
        gallery: selectedVariation?.gallery || [],
        stock: selectedVariation?.stock || 0,
        price: selectedVariation?.price || 0,
        color_name: color,
      });

      const size = selectedVariation.attributes.find(
        (attr: any) => attr.name === "سایز" || attr.name === "طول",
      )?.value;

      if (size) {
        setAvailableSizes(colorVariations);
        setSelectedSize(size);
      }
    } else {
      setSelectedColorData(selectedColorDataValue);
      setAvailableSizes([]);
      setSelectedVariations(null);
    }
  };

  return {
    data,
    id,
    loading,

    handleSizeClick,
    handleColorClick,
    selectedSize,
    selectedColor,
    selectedColorData,
    fetchDataFromServer,
    availableSizes,
    colors,
    selectedVariations,
    sizeText,
  };
}
