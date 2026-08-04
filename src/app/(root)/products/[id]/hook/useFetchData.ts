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
  const [selectedWeight, setSelectedWeight] = useState<string>("");
  const [colors, setColors] = useState<any>([]);
  const [selectedVariations, setSelectedVariations] = useState<any>(null);
  const [variationsData, setVariationsData] = useState<any>(null);
  const [availableChains, setAvailableChains] = useState<any[]>([]);
  const [selectedChain, setSelectedChain] = useState<any>(null);

  const params = useParams();
  const { id } = params;

  const getChainAttribute = (variation: any) => {
    return variation?.attributes?.find((attr: any) => attr.name === "نوع زنجیر")
      ?.value;
  };

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
              setSelectedWeight(defaultSizeVariation.weight);
              const chain = getChainAttribute(defaultSizeVariation);

              if (chain) {
                setAvailableChains([chain]);
                setSelectedChain(chain);
              }
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
            const chain = getChainAttribute(sizeVariations[0]);

            if (chain) {
              setAvailableChains([chain]);
              setSelectedChain(chain);
            }
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

    const matchedVariations = availableSizes.filter((v: any) =>
      v.attributes.some(
        (attr: any) =>
          (attr.name === "سایز" || attr.name === "طول") &&
          attr.value?.id === size,
      ),
    );

    const chains = matchedVariations
      .map((v: any) => getChainAttribute(v))
      .filter(Boolean);

    const uniqueChains = Array.from(
      new Map(chains.map((item: any) => [item.id, item])).values(),
    );

    setAvailableChains(uniqueChains);

    if (uniqueChains.length > 0) {
      setSelectedChain(uniqueChains[0]);
    } else {
      setSelectedChain(null);
    }

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

    setAvailableChains([]);
    setSelectedChain(null);

    if (colorVariations.length > 0) {
      const selectedVariation = colorVariations[0];

      setSelectedVariations(selectedVariation);
      const chains = colorVariations
        .map((v: any) => getChainAttribute(v))
        .filter(Boolean);

      const uniqueChains = Array.from(
        new Map(chains.map((item: any) => [item.id, item])).values(),
      );

      setAvailableChains(uniqueChains);

      if (uniqueChains.length > 0) {
        setSelectedChain(uniqueChains[0]);
      }
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

  const handleChainClick = (chainId: number) => {
    if (!variationsData?.length) return;

    const variation = variationsData.find((v: any) => {
      const chain = getChainAttribute(v);
      return chain?.id === chainId;
    });

    if (!variation) return;

    setSelectedChain(getChainAttribute(variation));
    setSelectedVariations(variation);
  };

  const handleWeightClick = (weight: string) => {
    setSelectedWeight(weight);
  
    if (!variationsData?.length) return;
  
    const variation = variationsData.find((v: any) => v.weight === weight);
  
    if (!variation) return;
  
    setSelectedVariations(variation);

    const size = variation.attributes?.find(
      (attr: any) => attr.name === "سایز" || attr.name === "طول",
    )?.value;
  
    if (size) {
      setSelectedSize(size);
    }
    const color = variation.attributes?.find(
      (attr: any) => attr.name === "رنگ",
    )?.value;
  
    if (color) {
      setSelectedColor(color.value);
    }

    const chain = getChainAttribute(variation);
  
    if (chain) {
      setSelectedChain(chain);
    }
  
    setSelectedColorData((prev: any) => ({
      ...prev,
      color: color?.value || prev.color,
      color_name: color?.value || prev.color_name,
      gallery: variation.gallery || [],
      stock: variation.stock || 0,
      price: variation.price || 0,
    }));
  };

  return {
    data,
    id,
    loading,
    availableChains,
    selectedChain,
    handleChainClick,
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
    selectedWeight,
    handleWeightClick,
  };
}
