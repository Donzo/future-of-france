// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts@4.9.0/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.9.0/access/Ownable.sol";
import "@openzeppelin/contracts@4.9.0/utils/Strings.sol";
import "@openzeppelin/contracts@4.9.0/utils/Base64.sol";
import "@openzeppelin/contracts@4.9.0/token/ERC721/extensions/ERC721Enumerable.sol";

//FOF Graduation Gift NFT Contract
contract FOFGraduationGiftNFTContract is ERC721, ERC721Enumerable, Ownable {
   
	using Strings for uint256;

	uint256 public nextTokenId;
	

	constructor() ERC721("FOF Graduation Gift", "FOFGG") {
		nextTokenId = 1;
	}
	
	function safeMint(address to) public onlyOwner {
		uint256 tokenId = nextTokenId;
		_safeMint(to, tokenId);
		tokenURI(tokenId);
		nextTokenId++;
	}

	//Values
	string public description;
	string public imgURL;
	string public itemType;
	string public material;

	//Build Settings
	bool internal lapelPin;
	bool internal classRing;
	bool internal medal;
	bool internal platinum;
	bool internal gold;
	bool internal silver;
	bool internal bronze;
	bool internal copper;
	bool internal brass;
               
	function setIMGURL(bool _lapelPin, bool _classRing, bool _medal, bool _platinum, bool _gold, bool _silver, bool _bronze, bool _copper, bool _brass) public onlyOwner{
		lapelPin = _lapelPin;
		classRing = _classRing;
		medal = _medal;
		platinum = _platinum;
		gold = _gold;
		silver = _silver;
		bronze = _bronze;
		copper = _copper;
		brass = _brass;

		if (lapelPin){
			itemType = "Lapel Pin";
			if (platinum){
				imgURL = "https://fofrance.com/nft/lapel-platinum.png";
				material = "Platinum";
			}
			else if (gold){
				imgURL = "https://fofrance.com/nft/lapel-gold.png";
				material = "Gold";
			}
			else if (silver){
				imgURL = "https://fofrance.com/nft/lapel-silver.png";
				material = "Silver";
			}
			else if (bronze){
				imgURL = "https://fofrance.com/nft/lapel-bronze.png";
				material = "Bronze";
			}
			else if (copper){
				imgURL = "https://fofrance.com/nft/lapel-copper.png";
				material = "Copper";
			}
			else if (brass){
				imgURL = "https://fofrance.com/nft/lapel-brass.png";
				material = "Brass";
			}
		}
		else if (classRing){
			itemType = "Class Ring";
			if (platinum){
				imgURL = "https://fofrance.com/nft/ring-platinum.png";
				material = "Platinum";
			}
			else if (gold){
				imgURL = "https://fofrance.com/nft/ring-gold.png";
				material = "Gold";
			}
			else if (silver){
				imgURL = "https://fofrance.com/nft/ring-silver.png";
				material = "Silver";
			}
			else if (bronze){
				imgURL = "https://fofrance.com/nft/ring-bronze.png";
				material = "Bronze";
			}
			else if (copper){
				imgURL = "https://fofrance.com/nft/ring-copper.png";
				material = "Copper";
			}
			else if (brass){
				imgURL = "https://fofrance.com/nft/ring-brass.png";
				material = "Brass";
			}
		}
		else if (medal){
			itemType = "Medal";
			if (platinum){
				imgURL = "https://fofrance.com/nft/medal-platinum.png";
				material = "Platinum";
			}
			else if (gold){
				imgURL = "https://fofrance.com/nft/medal-gold.png";
				material = "Gold";
			}
			else if (silver){
				imgURL = "https://fofrance.com/nft/medal-silver.png";
				material = "Silver";
			}
			else if (bronze){
				imgURL = "https://fofrance.com/nft/medal-bronze.png";
				material = "Bronze";
			}
			else if (copper){
				imgURL = "https://fofrance.com/nft/medal-copper.png";
				material = "Copper";
			}
			else if (brass){
				imgURL = "https://fofrance.com/nft/medal-brass.png";
				itemType = "Brass";
			}
		}
	}

	function setDescription(string memory _description) public onlyOwner{
		description = _description;
	}

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
		internal
		override(ERC721, ERC721Enumerable)
	{
		super._beforeTokenTransfer(from, to, tokenId, batchSize);
	}
	
    function supportsInterface(bytes4 interfaceId)
		public
		view
		override(ERC721, ERC721Enumerable)
		returns (bool)
	{
		return super.supportsInterface(interfaceId);
	}

	function tokenURI(uint256 tokenId)
		public
		view
		override
		returns (string memory)
	{
		bytes memory dataURI = abi.encodePacked(
			'{',
				'"name": "FOF Graduation Gift #', tokenId.toString(), '"'',',
				'"description": ''"', description, '"',',',
				'"external_url": "https://fofrance.com/"'',',
				'"image": ''"', imgURL, '"',',',
				'"attributes":',
					'[',
						'{',
							'"trait_type": "Item Type"'',', 
							'"value": ''"', itemType, '"',
						'}'',',
						'{',
							'"trait_type": "Material"'',', 
							'"value": ''"', material, '"',
						'}',
					']',
			'}'
		);
		return string(
			abi.encodePacked(
				"data:application/json;base64,",
				Base64.encode(dataURI)
			)
		);
	}
}