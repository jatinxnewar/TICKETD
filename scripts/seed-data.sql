-- Seed data for Ticket'D platform

-- Insert sample users
INSERT INTO users (wallet_address, display_name, email, bio) VALUES
('0x1234567890abcdef1234567890abcdef12345678', 'Alice Cooper', 'alice@example.com', 'Blockchain enthusiast and event organizer'),
('0x9876543210fedcba9876543210fedcba98765432', 'Bob Smith', 'bob@example.com', 'Web3 developer and crypto trader'),
('0x5555666677778888999900001111222233334444', 'Carol Johnson', 'carol@example.com', 'NFT artist and collector'),
('0xaaaaaaaa  'Carol Johnson', 'carol@example.com', 'NFT artist and collector'),
('0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'David Wilson', 'david@example.com', 'Event photographer and content creator'),
('0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb', 'Eve Martinez', 'eve@example.com', 'Music producer and festival organizer');

-- Insert sample events
INSERT INTO events (id, creator_id, title, description, category, location, venue, event_date, start_time, end_time, contract_address, status, social_links) VALUES
('11111111-1111-1111-1111-111111111111', (SELECT id FROM users WHERE wallet_address = '0x1234567890abcdef1234567890abcdef12345678'), 'Blockchain Summit 2024', 'The premier blockchain conference featuring industry leaders and innovative projects.', 'Technology', 'San Francisco, CA', 'Moscone Center', '2024-03-15 18:00:00+00', '18:00', '22:00', '0xcontract1111111111111111111111111111111', 'active', '{"website": "https://blockchainsummit.com", "twitter": "@blockchainsummit"}'),
('22222222-2222-2222-2222-222222222222', (SELECT id FROM users WHERE wallet_address = '0x9876543210fedcba9876543210fedcba98765432'), 'NFT Art Gallery Opening', 'Exclusive opening of digital art gallery featuring renowned NFT artists.', 'Art', 'New York, NY', 'Chelsea Gallery District', '2024-03-20 19:00:00+00', '19:00', '23:00', '0xcontract2222222222222222222222222222222', 'active', '{"website": "https://nftgallery.art", "twitter": "@nftgallerynyc"}'),
('33333333-3333-3333-3333-333333333333', (SELECT id FROM users WHERE wallet_address = '0x5555666677778888999900001111222233334444'), 'Web3 Gaming Conference', 'Explore the future of gaming with blockchain technology and NFTs.', 'Gaming', 'Los Angeles, CA', 'LA Convention Center', '2024-04-01 10:00:00+00', '10:00', '18:00', '0xcontract3333333333333333333333333333333', 'active', '{"website": "https://web3gaming.com", "discord": "https://discord.gg/web3gaming"}');

-- Insert sample ticket types
INSERT INTO ticket_types (id, event_id, name, description, price, quantity, max_per_wallet) VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'VIP', 'VIP access with networking dinner and premium seating', 0.1, 50, 2),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111', 'General', 'General admission to all conference sessions', 0.05, 200, 5),
('cccccccc-cccc-cccc-cccc-cccccccccccc', '22222222-2222-2222-2222-222222222222', 'Premium', 'Premium access with artist meet & greet', 0.08, 30, 2),
('dddddddd-dddd-dddd-dddd-dddddddddddd', '22222222-2222-2222-2222-222222222222', 'General', 'General admission to gallery opening', 0.03, 100, 3),
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '33333333-3333-3333-3333-333333333333', 'Developer', 'Developer track with hands-on workshops', 0.12, 75, 3),
('ffffffff-ffff-ffff-ffff-ffffffffffff', '33333333-3333-3333-3333-333333333333', 'General', 'General conference access', 0.06, 150, 5);

-- Insert sample NFT tickets
INSERT INTO nft_tickets (id, event_id, ticket_type_id, owner_id, token_id, contract_address, purchase_price, status, qr_code) VALUES
('ticket01-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', (SELECT id FROM users WHERE wallet_address = '0x9876543210fedcba9876543210fedcba98765432'), '1001', '0xcontract1111111111111111111111111111111', 0.1, 'active', 'QR1001BLOCKCHAIN'),
('ticket02-0000-0000-0000-000000000002', '11111111-1111-1111-1111-111111111111', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', (SELECT id FROM users WHERE wallet_address = '0x5555666677778888999900001111222233334444'), '1002', '0xcontract1111111111111111111111111111111', 0.05, 'active', 'QR1002BLOCKCHAIN'),
('ticket03-0000-0000-0000-000000000003', '22222222-2222-2222-2222-222222222222', 'cccccccc-cccc-cccc-cccc-cccccccccccc', (SELECT id FROM users WHERE wallet_address = '0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'), '2001', '0xcontract2222222222222222222222222222222', 0.08, 'active', 'QR2001NFTART'),
('ticket04-0000-0000-0000-000000000004', '33333333-3333-3333-3333-333333333333', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', (SELECT id FROM users WHERE wallet_address = '0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb'), '3001', '0xcontract3333333333333333333333333333333', 0.12, 'active', 'QR3001GAMING');

-- Insert sample marketplace listings
INSERT INTO marketplace_listings (id, ticket_id, seller_id, price, status) VALUES
('listing1-0000-0000-0000-000000000001', 'ticket02-0000-0000-0000-000000000002', (SELECT id FROM users WHERE wallet_address = '0x5555666677778888999900001111222233334444'), 0.06, 'active'),
('listing2-0000-0000-0000-000000000002', 'ticket03-0000-0000-0000-000000000003', (SELECT id FROM users WHERE wallet_address = '0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'), 0.09, 'active');

-- Insert sample transactions
INSERT INTO transactions (user_id, event_id, ticket_id, transaction_hash, transaction_type, amount, status) VALUES
((SELECT id FROM users WHERE wallet_address = '0x9876543210fedcba9876543210fedcba98765432'), '11111111-1111-1111-1111-111111111111', 'ticket01-0000-0000-0000-000000000001', '0xtxhash1111111111111111111111111111111111111111111111111111111111', 'purchase', 0.1, 'confirmed'),
((SELECT id FROM users WHERE wallet_address = '0x5555666677778888999900001111222233334444'), '11111111-1111-1111-1111-111111111111', 'ticket02-0000-0000-0000-000000000002', '0xtxhash2222222222222222222222222222222222222222222222222222222222', 'purchase', 0.05, 'confirmed'),
((SELECT id FROM users WHERE wallet_address = '0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'), '22222222-2222-2222-2222-222222222222', 'ticket03-0000-0000-0000-000000000003', '0xtxhash3333333333333333333333333333333333333333333333333333333333', 'purchase', 0.08, 'confirmed');
